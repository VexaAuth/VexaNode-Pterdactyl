<?php

namespace Pterodactyl\Http\Controllers\Api\Client;

use Illuminate\Http\Request;
use Pterodactyl\Models\Ticket;
use Illuminate\Http\JsonResponse;
use Pterodactyl\Models\TicketMessage;
use Pterodactyl\Transformers\Api\Client\TicketTransformer;
use Pterodactyl\Http\Requests\Api\Client\Tickets\StoreTicketRequest;
use Pterodactyl\Http\Requests\Api\Client\Tickets\UpdateTicketRequest;

class TicketController extends ClientApiController
{
    /**
     * Get all tickets for the authenticated user.
     */
    public function index(Request $request): array
    {
        $user = $request->user();
        
        $tickets = Ticket::query()
            ->where('user_id', $user->id)
            ->with(['server', 'messages.user'])
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        return $this->fractal->collection($tickets)
            ->transformWith($this->getTransformer(TicketTransformer::class))
            ->toArray();
    }

    /**
     * Get a specific ticket.
     */
    public function view(Request $request, string $ticketId): array
    {
        $user = $request->user();
        
        $ticket = Ticket::query()
            ->where('id', $ticketId)
            ->where('user_id', $user->id)
            ->with(['server', 'messages.user', 'user'])
            ->firstOrFail();

        return $this->fractal->item($ticket)
            ->transformWith($this->getTransformer(TicketTransformer::class))
            ->toArray();
    }

    /**
     * Create a new ticket.
     */
    public function store(StoreTicketRequest $request): array
    {
        $user = $request->user();
        
        $ticket = Ticket::create([
            'user_id' => $user->id,
            'server_id' => $request->input('server_id'),
            'subject' => $request->input('subject'),
            'priority' => $request->input('priority', 'medium'),
            'category' => $request->input('category'),
            'status' => Ticket::STATUS_OPEN,
        ]);

        // Create the initial message
        TicketMessage::create([
            'ticket_id' => $ticket->id,
            'user_id' => $user->id,
            'message' => $request->input('message'),
            'is_staff_reply' => false,
        ]);

        $ticket->load(['server', 'messages.user']);

        return $this->fractal->item($ticket)
            ->transformWith($this->getTransformer(TicketTransformer::class))
            ->toArray();
    }

    /**
     * Update a ticket (change status, priority, etc.).
     */
    public function update(UpdateTicketRequest $request, string $ticketId): array
    {
        $user = $request->user();
        
        $ticket = Ticket::query()
            ->where('id', $ticketId)
            ->where('user_id', $user->id)
            ->firstOrFail();

        if ($request->has('status')) {
            $ticket->status = $request->input('status');
            
            if ($request->input('status') === Ticket::STATUS_CLOSED) {
                $ticket->closed_at = now();
                $ticket->closed_by = $user->id;
            }
        }

        if ($request->has('priority')) {
            $ticket->priority = $request->input('priority');
        }

        $ticket->save();
        $ticket->load(['server', 'messages.user']);

        return $this->fractal->item($ticket)
            ->transformWith($this->getTransformer(TicketTransformer::class))
            ->toArray();
    }

    /**
     * Add a message to a ticket.
     */
    public function addMessage(Request $request, string $ticketId): JsonResponse
    {
        $user = $request->user();
        
        $ticket = Ticket::query()
            ->where('id', $ticketId)
            ->where('user_id', $user->id)
            ->firstOrFail();

        if ($ticket->isClosed()) {
            return response()->json([
                'error' => 'Cannot add messages to a closed ticket.',
            ], 400);
        }

        $request->validate([
            'message' => 'required|string|min:1|max:5000',
        ]);

        $message = TicketMessage::create([
            'ticket_id' => $ticket->id,
            'user_id' => $user->id,
            'message' => $request->input('message'),
            'is_staff_reply' => false,
        ]);

        // Update ticket status to awaiting reply
        $ticket->update(['status' => Ticket::STATUS_AWAITING_REPLY]);

        $message->load('user');

        return response()->json([
            'data' => [
                'id' => $message->id,
                'message' => $message->message,
                'is_staff_reply' => $message->is_staff_reply,
                'created_at' => $message->created_at->toIso8601String(),
                'user' => [
                    'id' => $message->user->id,
                    'email' => $message->user->email,
                    'username' => $message->user->username,
                ],
            ],
        ]);
    }

    /**
     * Close a ticket.
     */
    public function close(Request $request, string $ticketId): JsonResponse
    {
        $user = $request->user();
        
        $ticket = Ticket::query()
            ->where('id', $ticketId)
            ->where('user_id', $user->id)
            ->firstOrFail();

        $ticket->update([
            'status' => Ticket::STATUS_CLOSED,
            'closed_at' => now(),
            'closed_by' => $user->id,
        ]);

        return response()->json([
            'message' => 'Ticket closed successfully.',
        ]);
    }
}

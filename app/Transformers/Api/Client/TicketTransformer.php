<?php

namespace Pterodactyl\Transformers\Api\Client;

use Pterodactyl\Models\Ticket;
use Pterodactyl\Models\TicketMessage;

class TicketTransformer extends BaseClientTransformer
{
    protected array $availableIncludes = ['messages', 'server'];

    public function getResourceName(): string
    {
        return Ticket::RESOURCE_NAME;
    }

    public function transform(Ticket $ticket): array
    {
        return [
            'id' => $ticket->id,
            'subject' => $ticket->subject,
            'status' => $ticket->status,
            'priority' => $ticket->priority,
            'category' => $ticket->category,
            'server_id' => $ticket->server_id,
            'created_at' => $ticket->created_at->toIso8601String(),
            'updated_at' => $ticket->updated_at->toIso8601String(),
            'closed_at' => $ticket->closed_at?->toIso8601String(),
            'unread_count' => $this->getUnreadCount($ticket),
        ];
    }

    public function includeMessages(Ticket $ticket): \League\Fractal\Resource\Collection
    {
        return $this->collection($ticket->messages, function (TicketMessage $message) {
            return [
                'id' => $message->id,
                'message' => $message->message,
                'is_staff_reply' => $message->is_staff_reply,
                'created_at' => $message->created_at->toIso8601String(),
                'user' => [
                    'id' => $message->user->id,
                    'email' => $message->user->email,
                    'username' => $message->user->username,
                    'root_admin' => $message->user->root_admin,
                ],
            ];
        });
    }

    public function includeServer(Ticket $ticket): ?\League\Fractal\Resource\Item
    {
        if (!$ticket->server) {
            return null;
        }

        return $this->item($ticket->server, $this->makeTransformer(ServerTransformer::class));
    }

    private function getUnreadCount(Ticket $ticket): int
    {
        // Count staff replies that came after the last user message
        $lastUserMessage = $ticket->messages()
            ->where('is_staff_reply', false)
            ->orderBy('created_at', 'desc')
            ->first();

        if (!$lastUserMessage) {
            return $ticket->messages()->where('is_staff_reply', true)->count();
        }

        return $ticket->messages()
            ->where('is_staff_reply', true)
            ->where('created_at', '>', $lastUserMessage->created_at)
            ->count();
    }
}

<?php

namespace Pterodactyl\Http\Requests\Api\Client\Tickets;

use Pterodactyl\Models\Ticket;
use Pterodactyl\Http\Requests\Api\Client\ClientApiRequest;

class StoreTicketRequest extends ClientApiRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'subject' => 'required|string|min:3|max:255',
            'message' => 'required|string|min:10|max:5000',
            'priority' => 'sometimes|string|in:' . implode(',', Ticket::$validPriorities),
            'category' => 'nullable|string|max:100',
            'server_id' => 'nullable|integer|exists:servers,id',
        ];
    }

    public function messages(): array
    {
        return [
            'subject.required' => 'A ticket subject is required.',
            'subject.min' => 'The subject must be at least 3 characters.',
            'message.required' => 'A message is required.',
            'message.min' => 'The message must be at least 10 characters.',
        ];
    }
}

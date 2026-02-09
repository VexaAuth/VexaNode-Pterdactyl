<?php

namespace Pterodactyl\Http\Requests\Api\Client\Tickets;

use Pterodactyl\Models\Ticket;
use Pterodactyl\Http\Requests\Api\Client\ClientApiRequest;

class UpdateTicketRequest extends ClientApiRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'status' => 'sometimes|string|in:' . implode(',', Ticket::$validStatuses),
            'priority' => 'sometimes|string|in:' . implode(',', Ticket::$validPriorities),
        ];
    }
}

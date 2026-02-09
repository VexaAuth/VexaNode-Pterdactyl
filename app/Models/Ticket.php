<?php

namespace Pterodactyl\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property int $id
 * @property int $user_id
 * @property int|null $server_id
 * @property string $subject
 * @property string $status
 * @property string $priority
 * @property string|null $category
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property \Carbon\Carbon|null $closed_at
 * @property int|null $closed_by
 */
class Ticket extends Model
{
    /**
     * The resource name for this model when it is transformed into an
     * API representation using fractal.
     */
    public const RESOURCE_NAME = 'ticket';

    /**
     * The table associated with the model.
     */
    protected $table = 'tickets';

    /**
     * The attributes that should be mutated to dates.
     */
    protected $casts = [
        'closed_at' => 'datetime',
    ];

    /**
     * Fields that are mass assignable.
     */
    protected $fillable = [
        'user_id',
        'server_id',
        'subject',
        'status',
        'priority',
        'category',
        'closed_at',
        'closed_by',
    ];

    public const STATUS_OPEN = 'open';
    public const STATUS_ANSWERED = 'answered';
    public const STATUS_AWAITING_REPLY = 'awaiting_reply';
    public const STATUS_CLOSED = 'closed';

    public const PRIORITY_LOW = 'low';
    public const PRIORITY_MEDIUM = 'medium';
    public const PRIORITY_HIGH = 'high';
    public const PRIORITY_URGENT = 'urgent';

    public static array $validStatuses = [
        self::STATUS_OPEN,
        self::STATUS_ANSWERED,
        self::STATUS_AWAITING_REPLY,
        self::STATUS_CLOSED,
    ];

    public static array $validPriorities = [
        self::PRIORITY_LOW,
        self::PRIORITY_MEDIUM,
        self::PRIORITY_HIGH,
        self::PRIORITY_URGENT,
    ];

    /**
     * Get the user that created the ticket.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the server associated with the ticket.
     */
    public function server(): BelongsTo
    {
        return $this->belongsTo(Server::class);
    }

    /**
     * Get the user that closed the ticket.
     */
    public function closedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'closed_by');
    }

    /**
     * Get all messages for the ticket.
     */
    public function messages(): HasMany
    {
        return $this->hasMany(TicketMessage::class)->orderBy('created_at', 'asc');
    }

    /**
     * Check if the ticket is open.
     */
    public function isOpen(): bool
    {
        return $this->status !== self::STATUS_CLOSED;
    }

    /**
     * Check if the ticket is closed.
     */
    public function isClosed(): bool
    {
        return $this->status === self::STATUS_CLOSED;
    }
}

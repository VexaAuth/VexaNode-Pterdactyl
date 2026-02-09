import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Ticket } from '@/api/account/tickets';
import { format } from 'date-fns';
import tw from 'twin.macro';
import Card from '@/reviactyl/ui/Card';
import {
    ChatAltIcon,
    ClockIcon,
    ExclamationIcon,
    CheckCircleIcon,
    XCircleIcon
} from '@heroicons/react/solid';

interface Props {
    ticket: Ticket;
}

const statusColors = {
    open: 'text-blue-400 bg-blue-400/10',
    answered: 'text-green-400 bg-green-400/10',
    awaiting_reply: 'text-yellow-400 bg-yellow-400/10',
    closed: 'text-gray-400 bg-gray-400/10',
};

const priorityColors = {
    low: 'text-gray-400',
    medium: 'text-blue-400',
    high: 'text-orange-400',
    urgent: 'text-red-400',
};

const priorityIcons = {
    low: ClockIcon,
    medium: ChatAltIcon,
    high: ExclamationIcon,
    urgent: ExclamationIcon,
};

const statusIcons = {
    open: ChatAltIcon,
    answered: CheckCircleIcon,
    awaiting_reply: ClockIcon,
    closed: XCircleIcon,
};

const TicketRow: React.FC<Props> = ({ ticket }) => {
    const history = useHistory();
    const [isHovered, setIsHovered] = useState(false);

    const PriorityIcon = priorityIcons[ticket.priority];
    const StatusIcon = statusIcons[ticket.status];

    return (
        <Card
            css={[
                tw`cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-lg`,
                isHovered && tw`ring-2 ring-reviactyl/50`,
            ]}
            onClick={() => history.push(`/account/tickets/${ticket.id}`)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div css={tw`flex items-start justify-between gap-4`}>
                <div css={tw`flex-1 min-w-0`}>
                    <div css={tw`flex items-center gap-2 mb-2`}>
                        <PriorityIcon css={tw`w-5 h-5 flex-shrink-0`} className={priorityColors[ticket.priority]} />
                        <h3 css={tw`text-lg font-semibold text-gray-100 truncate`}>{ticket.subject}</h3>
                        {ticket.unreadCount > 0 && (
                            <span css={tw`px-2 py-0.5 text-xs font-bold bg-reviactyl text-white rounded-full`}>
                                {ticket.unreadCount}
                            </span>
                        )}
                    </div>

                    <div css={tw`flex flex-wrap items-center gap-3 text-sm text-gray-400`}>
                        <div css={tw`flex items-center gap-1`}>
                            <StatusIcon css={tw`w-4 h-4`} />
                            <span
                                css={tw`px-2 py-0.5 rounded-full text-xs font-medium capitalize`}
                                className={statusColors[ticket.status]}
                            >
                                {ticket.status.replace('_', ' ')}
                            </span>
                        </div>

                        <span>•</span>

                        <span css={tw`capitalize`}>{ticket.priority} priority</span>

                        {ticket.server && (
                            <>
                                <span>•</span>
                                <span css={tw`truncate max-w-[200px]`}>Server: {ticket.server.name}</span>
                            </>
                        )}

                        {ticket.category && (
                            <>
                                <span>•</span>
                                <span css={tw`capitalize`}>{ticket.category}</span>
                            </>
                        )}
                    </div>
                </div>

                <div css={tw`flex flex-col items-end gap-1 text-sm text-gray-400 flex-shrink-0`}>
                    <span css={tw`text-xs`}>{format(ticket.createdAt, 'MMM dd, yyyy')}</span>
                    <span css={tw`text-xs`}>{format(ticket.createdAt, 'HH:mm')}</span>
                </div>
            </div>
        </Card>
    );
};

export default TicketRow;

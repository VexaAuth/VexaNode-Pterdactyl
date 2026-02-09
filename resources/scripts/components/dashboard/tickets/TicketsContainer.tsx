import React, { useEffect, useState } from 'react';
import { getTickets, Ticket } from '@/api/account/tickets';
import PageContentBlock from '@/components/elements/PageContentBlock';
import Spinner from '@/components/elements/Spinner';
import useFlash from '@/plugins/useFlash';
import tw from 'twin.macro';
import { useHistory } from 'react-router-dom';
import { Button } from '@/components/elements/Button';
import { PlusIcon, TicketIcon } from '@heroicons/react/solid';
import TicketRow from './TicketRow';
import Card from '@/reviactyl/ui/Card';
import Title from '@/reviactyl/ui/Title';

const TicketsContainer = () => {
    const history = useHistory();
    const { clearFlashes, clearAndAddHttpError } = useFlash();
    const [loading, setLoading] = useState(true);
    const [tickets, setTickets] = useState<Ticket[]>([]);

    useEffect(() => {
        clearFlashes('tickets');

        getTickets()
            .then((data) => {
                setTickets(data.items);
                setLoading(false);
            })
            .catch((error) => {
                clearAndAddHttpError({ key: 'tickets', error });
                setLoading(false);
            });
    }, []);

    return (
        <PageContentBlock title='Support Tickets' showFlashKey='tickets'>
            <div css={tw`flex items-center justify-between mb-6`}>
                <div>
                    <Title css={tw`text-4xl`}>Support Tickets</Title>
                    <p css={tw`text-sm text-gray-400 mt-1`}>
                        View and manage your support requests
                    </p>
                </div>
                <Button
                    onClick={() => history.push('/account/tickets/new')}
                    css={tw`flex items-center gap-2`}
                >
                    <PlusIcon css={tw`w-5 h-5`} />
                    New Ticket
                </Button>
            </div>

            {loading ? (
                <Spinner centered size='large' />
            ) : tickets.length === 0 ? (
                <Card css={tw`text-center py-12`}>
                    <TicketIcon css={tw`w-16 h-16 mx-auto text-gray-600 mb-4`} />
                    <h3 css={tw`text-xl font-semibold text-gray-300 mb-2`}>No tickets yet</h3>
                    <p css={tw`text-gray-400 mb-6`}>
                        Create your first support ticket to get help from our team
                    </p>
                    <Button onClick={() => history.push('/account/tickets/new')}>
                        <PlusIcon css={tw`w-5 h-5 mr-2`} />
                        Create Ticket
                    </Button>
                </Card>
            ) : (
                <div css={tw`space-y-3`}>
                    {tickets.map((ticket) => (
                        <TicketRow key={ticket.id} ticket={ticket} />
                    ))}
                </div>
            )}
        </PageContentBlock>
    );
};

export default TicketsContainer;

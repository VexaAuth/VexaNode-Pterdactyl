import React, { useEffect, useState, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { getTicket, addTicketMessage, closeTicket, Ticket, TicketMessage } from '@/api/account/tickets';
import PageContentBlock from '@/components/elements/PageContentBlock';
import Spinner from '@/components/elements/Spinner';
import useFlash from '@/plugins/useFlash';
import tw from 'twin.macro';
import { Button } from '@/components/elements/Button';
import { ArrowLeftIcon, PaperAirplaneIcon, XCircleIcon } from '@heroicons/react/solid';
import Card from '@/reviactyl/ui/Card';
import Title from '@/reviactyl/ui/Title';
import { format } from 'date-fns';
import { Field as FormikField, Form, Formik } from 'formik';
import { object, string } from 'yup';

const messageSchema = object().shape({
    message: string().required('Message is required').min(1, 'Message cannot be empty'),
});

const TicketViewContainer = () => {
    const { id } = useParams<{ id: string }>();
    const history = useHistory();
    const { clearFlashes, clearAndAddHttpError, addFlash } = useFlash();
    const [loading, setLoading] = useState(true);
    const [ticket, setTicket] = useState<Ticket | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        clearFlashes('ticket-view');

        getTicket(parseInt(id))
            .then((data) => {
                setTicket(data);
                setLoading(false);
                setTimeout(scrollToBottom, 100);
            })
            .catch((error) => {
                clearAndAddHttpError({ key: 'ticket-view', error });
                setLoading(false);
            });
    }, [id]);

    const handleSendMessage = (values: { message: string }, { resetForm }: any) => {
        if (!ticket) return;

        addTicketMessage(ticket.id, values.message)
            .then((newMessage) => {
                setTicket({
                    ...ticket,
                    messages: [...(ticket.messages || []), newMessage],
                    status: 'awaiting_reply',
                });
                resetForm();
                setTimeout(scrollToBottom, 100);
            })
            .catch((error) => {
                clearAndAddHttpError({ key: 'ticket-view', error });
            });
    };

    const handleCloseTicket = () => {
        if (!ticket || !confirm('Are you sure you want to close this ticket?')) return;

        closeTicket(ticket.id)
            .then(() => {
                addFlash({
                    key: 'ticket-view',
                    type: 'success',
                    message: 'Ticket closed successfully',
                });
                setTicket({ ...ticket, status: 'closed', closedAt: new Date() });
            })
            .catch((error) => {
                clearAndAddHttpError({ key: 'ticket-view', error });
            });
    };

    if (loading) {
        return (
            <PageContentBlock title='Loading Ticket'>
                <Spinner centered size='large' />
            </PageContentBlock>
        );
    }

    if (!ticket) {
        return (
            <PageContentBlock title='Ticket Not Found'>
                <Card css={tw`text-center py-12`}>
                    <h3 css={tw`text-xl font-semibold text-gray-300 mb-2`}>Ticket not found</h3>
                    <p css={tw`text-gray-400 mb-6`}>The ticket you're looking for doesn't exist</p>
                    <Button onClick={() => history.push('/account/tickets')}>Back to Tickets</Button>
                </Card>
            </PageContentBlock>
        );
    }

    const statusColors = {
        open: 'bg-blue-500',
        answered: 'bg-green-500',
        awaiting_reply: 'bg-yellow-500',
        closed: 'bg-gray-500',
    };

    const priorityColors = {
        low: 'text-gray-400',
        medium: 'text-blue-400',
        high: 'text-orange-400',
        urgent: 'text-red-400',
    };

    return (
        <PageContentBlock title={ticket.subject} showFlashKey='ticket-view'>
            <div css={tw`mb-6`}>
                <Button.Text onClick={() => history.push('/account/tickets')} css={tw`mb-4`}>
                    <ArrowLeftIcon css={tw`w-4 h-4 mr-2`} />
                    Back to Tickets
                </Button.Text>
                <div css={tw`flex items-start justify-between gap-4`}>
                    <div>
                        <Title css={tw`text-3xl mb-2`}>{ticket.subject}</Title>
                        <div css={tw`flex flex-wrap items-center gap-3 text-sm`}>
                            <span
                                css={tw`px-3 py-1 rounded-full text-white font-medium capitalize`}
                                className={statusColors[ticket.status]}
                            >
                                {ticket.status.replace('_', ' ')}
                            </span>
                            <span css={tw`capitalize font-medium`} className={priorityColors[ticket.priority]}>
                                {ticket.priority} Priority
                            </span>
                            {ticket.server && (
                                <span css={tw`text-gray-400`}>Server: {ticket.server.name}</span>
                            )}
                            <span css={tw`text-gray-400`}>
                                Created {format(ticket.createdAt, 'MMM dd, yyyy HH:mm')}
                            </span>
                        </div>
                    </div>
                    {ticket.status !== 'closed' && (
                        <Button.Danger onClick={handleCloseTicket} css={tw`flex items-center gap-2`}>
                            <XCircleIcon css={tw`w-5 h-5`} />
                            Close Ticket
                        </Button.Danger>
                    )}
                </div>
            </div>

            <Card css={tw`mb-4`}>
                <div css={tw`space-y-4 max-h-[600px] overflow-y-auto pr-2`}>
                    {ticket.messages?.map((message: TicketMessage, index: number) => (
                        <div
                            key={message.id}
                            css={[
                                tw`flex gap-3`,
                                message.isStaffReply ? tw`flex-row` : tw`flex-row-reverse`,
                            ]}
                        >
                            <div
                                css={[
                                    tw`flex-1 rounded-lg p-4`,
                                    message.isStaffReply
                                        ? tw`bg-blue-500/10 border border-blue-500/20`
                                        : tw`bg-gray-700/50 border border-gray-600/50`,
                                ]}
                            >
                                <div css={tw`flex items-center justify-between mb-2`}>
                                    <span
                                        css={[
                                            tw`font-semibold text-sm`,
                                            message.isStaffReply ? tw`text-blue-400` : tw`text-gray-300`,
                                        ]}
                                    >
                                        {message.user.rootAdmin ? '👨‍💼 ' : ''}
                                        {message.user.username}
                                        {message.isStaffReply && ' (Support Team)'}
                                    </span>
                                    <span css={tw`text-xs text-gray-500`}>
                                        {format(message.createdAt, 'MMM dd, HH:mm')}
                                    </span>
                                </div>
                                <p css={tw`text-gray-200 whitespace-pre-wrap break-words`}>{message.message}</p>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
            </Card>

            {ticket.status !== 'closed' && (
                <Card>
                    <Formik
                        initialValues={{ message: '' }}
                        validationSchema={messageSchema}
                        onSubmit={handleSendMessage}
                    >
                        {({ isSubmitting, values }) => (
                            <Form>
                                <div css={tw`flex gap-3`}>
                                    <FormikField
                                        as='textarea'
                                        name='message'
                                        placeholder='Type your message...'
                                        rows={3}
                                        disabled={isSubmitting}
                                        css={tw`flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-gray-200 placeholder-gray-500 focus:border-reviactyl focus:ring-2 focus:ring-reviactyl/50 resize-none`}
                                    />
                                    <Button
                                        type='submit'
                                        disabled={isSubmitting || !values.message.trim()}
                                        css={tw`self-end flex items-center gap-2`}
                                    >
                                        <PaperAirplaneIcon css={tw`w-5 h-5 rotate-90`} />
                                        Send
                                    </Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </Card>
            )}

            {ticket.status === 'closed' && (
                <Card css={tw`text-center py-8 bg-gray-800/50`}>
                    <XCircleIcon css={tw`w-12 h-12 mx-auto text-gray-500 mb-3`} />
                    <h3 css={tw`text-lg font-semibold text-gray-300 mb-1`}>This ticket is closed</h3>
                    <p css={tw`text-sm text-gray-400`}>
                        Closed on {ticket.closedAt && format(ticket.closedAt, 'MMM dd, yyyy HH:mm')}
                    </p>
                </Card>
            )}
        </PageContentBlock>
    );
};

export default TicketViewContainer;

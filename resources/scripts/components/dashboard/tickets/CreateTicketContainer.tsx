import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { object, string } from 'yup';
import { createTicket, CreateTicketData } from '@/api/account/tickets';
import PageContentBlock from '@/components/elements/PageContentBlock';
import Field from '@/components/elements/Field';
import { Button } from '@/components/elements/Button';
import useFlash from '@/plugins/useFlash';
import tw from 'twin.macro';
import Card from '@/reviactyl/ui/Card';
import Title from '@/reviactyl/ui/Title';
import { ArrowLeftIcon } from '@heroicons/react/solid';
import Select from '@/components/elements/Select';
import Label from '@/components/elements/Label';
import useSWR from 'swr';
import getServers from '@/api/getServers';

const validationSchema = object().shape({
    subject: string().required('Subject is required').min(3, 'Subject must be at least 3 characters'),
    message: string().required('Message is required').min(10, 'Message must be at least 10 characters'),
    priority: string().required('Priority is required'),
    category: string(),
    serverId: string(),
});

const CreateTicketContainer = () => {
    const history = useHistory();
    const { clearFlashes, clearAndAddHttpError } = useFlash();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { data: servers } = useSWR('/api/client/servers', () => getServers({ page: 1 }));

    const onSubmit = (values: any) => {
        clearFlashes('create-ticket');
        setIsSubmitting(true);

        const ticketData: CreateTicketData = {
            subject: values.subject,
            message: values.message,
            priority: values.priority,
            category: values.category || undefined,
            serverId: values.serverId ? parseInt(values.serverId) : undefined,
        };

        createTicket(ticketData)
            .then((ticket) => {
                history.push(`/account/tickets/${ticket.id}`);
            })
            .catch((error) => {
                clearAndAddHttpError({ key: 'create-ticket', error });
                setIsSubmitting(false);
            });
    };

    return (
        <PageContentBlock title='Create Ticket' showFlashKey='create-ticket'>
            <div css={tw`mb-6`}>
                <Button.Text onClick={() => history.push('/account/tickets')} css={tw`mb-4`}>
                    <ArrowLeftIcon css={tw`w-4 h-4 mr-2`} />
                    Back to Tickets
                </Button.Text>
                <Title css={tw`text-4xl`}>Create Support Ticket</Title>
                <p css={tw`text-sm text-gray-400 mt-1`}>
                    Describe your issue and our support team will assist you
                </p>
            </div>

            <Card>
                <Formik
                    initialValues={{
                        subject: '',
                        message: '',
                        priority: 'medium',
                        category: '',
                        serverId: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {({ values, setFieldValue }) => (
                        <Form>
                            <div css={tw`space-y-4`}>
                                <div>
                                    <Label>Subject</Label>
                                    <Field
                                        name='subject'
                                        placeholder='Brief description of your issue'
                                        disabled={isSubmitting}
                                    />
                                </div>

                                <div css={tw`grid grid-cols-1 md:grid-cols-2 gap-4`}>
                                    <div>
                                        <Label>Priority</Label>
                                        <Select
                                            name='priority'
                                            value={values.priority}
                                            onChange={(e) => setFieldValue('priority', e.target.value)}
                                            disabled={isSubmitting}
                                        >
                                            <option value='low'>Low</option>
                                            <option value='medium'>Medium</option>
                                            <option value='high'>High</option>
                                            <option value='urgent'>Urgent</option>
                                        </Select>
                                    </div>

                                    <div>
                                        <Label>Category (Optional)</Label>
                                        <Select
                                            name='category'
                                            value={values.category}
                                            onChange={(e) => setFieldValue('category', e.target.value)}
                                            disabled={isSubmitting}
                                        >
                                            <option value=''>Select a category</option>
                                            <option value='technical'>Technical Issue</option>
                                            <option value='billing'>Billing</option>
                                            <option value='general'>General Question</option>
                                            <option value='feature'>Feature Request</option>
                                            <option value='other'>Other</option>
                                        </Select>
                                    </div>
                                </div>

                                {servers && servers.items.length > 0 && (
                                    <div>
                                        <Label>Related Server (Optional)</Label>
                                        <Select
                                            name='serverId'
                                            value={values.serverId}
                                            onChange={(e) => setFieldValue('serverId', e.target.value)}
                                            disabled={isSubmitting}
                                        >
                                            <option value=''>No server selected</option>
                                            {servers.items.map((server) => (
                                                <option key={server.uuid} value={server.id}>
                                                    {server.name}
                                                </option>
                                            ))}
                                        </Select>
                                    </div>
                                )}

                                <div>
                                    <Label>Message</Label>
                                    <Field
                                        as='textarea'
                                        name='message'
                                        placeholder='Provide detailed information about your issue...'
                                        rows={8}
                                        disabled={isSubmitting}
                                        css={tw`resize-none`}
                                    />
                                </div>

                                <div css={tw`flex justify-end gap-3 pt-4`}>
                                    <Button.Text
                                        type='button'
                                        onClick={() => history.push('/account/tickets')}
                                        disabled={isSubmitting}
                                    >
                                        Cancel
                                    </Button.Text>
                                    <Button type='submit' disabled={isSubmitting}>
                                        {isSubmitting ? 'Creating...' : 'Create Ticket'}
                                    </Button>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Card>
        </PageContentBlock>
    );
};

export default CreateTicketContainer;

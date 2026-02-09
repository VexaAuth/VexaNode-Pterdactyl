import http, { FractalResponseData, getPaginationSet, PaginatedResult } from '@/api/http';

export interface Ticket {
    id: number;
    subject: string;
    status: 'open' | 'answered' | 'awaiting_reply' | 'closed';
    priority: 'low' | 'medium' | 'high' | 'urgent';
    category: string | null;
    serverId: number | null;
    createdAt: Date;
    updatedAt: Date;
    closedAt: Date | null;
    unreadCount: number;
    messages?: TicketMessage[];
    server?: {
        uuid: string;
        name: string;
        identifier: string;
    };
}

export interface TicketMessage {
    id: number;
    message: string;
    isStaffReply: boolean;
    createdAt: Date;
    user: {
        id: number;
        email: string;
        username: string;
        rootAdmin: boolean;
    };
}

export interface CreateTicketData {
    subject: string;
    message: string;
    priority?: 'low' | 'medium' | 'high' | 'urgent';
    category?: string;
    serverId?: number;
}

export const rawDataToTicket = ({ attributes }: FractalResponseData): Ticket => ({
    id: attributes.id,
    subject: attributes.subject,
    status: attributes.status,
    priority: attributes.priority,
    category: attributes.category,
    serverId: attributes.server_id,
    createdAt: new Date(attributes.created_at),
    updatedAt: new Date(attributes.updated_at),
    closedAt: attributes.closed_at ? new Date(attributes.closed_at) : null,
    unreadCount: attributes.unread_count || 0,
    messages: attributes.relationships?.messages?.data?.map((msg: any) => ({
        id: msg.attributes.id,
        message: msg.attributes.message,
        isStaffReply: msg.attributes.is_staff_reply,
        createdAt: new Date(msg.attributes.created_at),
        user: {
            id: msg.attributes.user.id,
            email: msg.attributes.user.email,
            username: msg.attributes.user.username,
            rootAdmin: msg.attributes.user.root_admin,
        },
    })),
    server: attributes.relationships?.server?.attributes
        ? {
            uuid: attributes.relationships.server.attributes.uuid,
            name: attributes.relationships.server.attributes.name,
            identifier: attributes.relationships.server.attributes.identifier,
        }
        : undefined,
});

export const getTickets = async (page = 1): Promise<PaginatedResult<Ticket>> => {
    const { data } = await http.get('/api/client/account/tickets', { params: { page } });

    return {
        items: (data.data || []).map(rawDataToTicket),
        pagination: getPaginationSet(data.meta.pagination),
    };
};

export const getTicket = async (ticketId: number): Promise<Ticket> => {
    const { data } = await http.get(`/api/client/account/tickets/${ticketId}`, {
        params: { include: ['messages', 'server'] },
    });

    return rawDataToTicket(data);
};

export const createTicket = async (ticketData: CreateTicketData): Promise<Ticket> => {
    const { data } = await http.post('/api/client/account/tickets', {
        subject: ticketData.subject,
        message: ticketData.message,
        priority: ticketData.priority || 'medium',
        category: ticketData.category,
        server_id: ticketData.serverId,
    });

    return rawDataToTicket(data);
};

export const addTicketMessage = async (ticketId: number, message: string): Promise<TicketMessage> => {
    const { data } = await http.post(`/api/client/account/tickets/${ticketId}/messages`, { message });

    return {
        id: data.data.id,
        message: data.data.message,
        isStaffReply: data.data.is_staff_reply,
        createdAt: new Date(data.data.created_at),
        user: {
            id: data.data.user.id,
            email: data.data.user.email,
            username: data.data.user.username,
            rootAdmin: data.data.user.root_admin,
        },
    };
};

export const closeTicket = async (ticketId: number): Promise<void> => {
    await http.post(`/api/client/account/tickets/${ticketId}/close`);
};

export const updateTicket = async (
    ticketId: number,
    updates: { status?: string; priority?: string }
): Promise<Ticket> => {
    const { data } = await http.patch(`/api/client/account/tickets/${ticketId}`, updates);

    return rawDataToTicket(data);
};

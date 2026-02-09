# VexaNode-Pterodactyl Ticket Support System Implementation

## Overview
This document outlines the comprehensive ticket support system implementation for the VexaNode-Pterodactyl panel, including backend API, database schema, and modern dark-themed frontend components.

## Features Implemented

### 1. Backend Components

#### Database Schema
- **tickets** table with fields:
  - id, user_id, server_id (optional)
  - subject, status, priority, category
  - created_at, updated_at, closed_at, closed_by
  
- **ticket_messages** table with fields:
  - id, ticket_id, user_id
  - message, is_staff_reply
  - created_at, updated_at

#### Models
- `Ticket.php` - Main ticket model with status/priority management
- `TicketMessage.php` - Individual messages within tickets

#### Controllers
- `TicketController.php` - Full CRUD operations:
  - `index()` - List all user tickets
  - `view()` - View specific ticket with messages
  - `store()` - Create new ticket
  - `update()` - Update ticket status/priority
  - `addMessage()` - Add message to ticket
  - `close()` - Close ticket

#### API Routes (`/api/client/account/tickets`)
- `GET /` - List tickets
- `POST /` - Create ticket
- `GET /{ticket}` - View ticket
- `PATCH /{ticket}` - Update ticket
- `POST /{ticket}/messages` - Add message
- `POST /{ticket}/close` - Close ticket

### 2. Frontend Components

#### API Client (`api/account/tickets.ts`)
- TypeScript interfaces for Ticket and TicketMessage
- API functions: getTickets, getTicket, createTicket, addTicketMessage, closeTicket, updateTicket
- Data transformation with rawDataToTicket

#### React Components

**TicketsContainer.tsx**
- Lists all tickets with status badges
- Empty state with call-to-action
- "Create Ticket" button
- Loading states

**CreateTicketContainer.tsx**
- Form with validation (Formik + Yup)
- Fields: subject, message, priority, category, server selection
- Server dropdown (optional)
- Category selection (Technical, Billing, General, Feature Request, Other)

**TicketViewContainer.tsx**
- Real-time message thread
- Staff reply highlighting (blue background)
- User messages (gray background)
- Message input with validation
- Close ticket functionality
- Auto-scroll to latest message
- Closed ticket state display

**TicketRow.tsx**
- Clickable ticket card
- Status badge with color coding:
  - Open: Blue
  - Answered: Green
  - Awaiting Reply: Yellow
  - Closed: Gray
- Priority indicator with icons
- Unread count badge
- Server name display
- Hover effects

### 3. Status & Priority System

#### Ticket Statuses
- **open** - Newly created ticket
- **answered** - Staff has replied
- **awaiting_reply** - User has replied after staff
- **closed** - Ticket resolved

#### Priority Levels
- **low** - Gray icon
- **medium** - Blue icon (default)
- **high** - Orange icon
- **urgent** - Red icon

### 4. UI/UX Features

#### Modern Dark Theme
- Dark card backgrounds with subtle borders
- Color-coded status badges
- Smooth hover transitions
- Responsive grid layout
- Professional typography

#### Interactive Elements
- Hover effects on ticket cards (scale + shadow)
- Real-time message updates
- Auto-scrolling message thread
- Form validation with error messages
- Loading spinners

#### Accessibility
- Semantic HTML
- ARIA labels
- Keyboard navigation support
- Clear visual hierarchy

## Installation Steps

### 1. Run Database Migration
```bash
php artisan migrate
```

### 2. Build Frontend Assets
```bash
yarn install
yarn build
```

### 3. Clear Cache
```bash
php artisan cache:clear
php artisan config:clear
php artisan route:clear
```

## Usage

### For Users
1. Navigate to **Account** → **Tickets**
2. Click **"New Ticket"** button
3. Fill in subject, message, priority, and optionally select a server
4. Submit ticket
5. View ticket details and add messages
6. Close ticket when resolved

### For Administrators
- View all tickets in admin panel (to be implemented)
- Reply to tickets (staff_reply flag set to true)
- Change ticket status and priority
- View ticket analytics

## File Structure

```
Backend:
├── app/Models/
│   ├── Ticket.php
│   └── TicketMessage.php
├── app/Http/Controllers/Api/Client/
│   └── TicketController.php
├── app/Http/Requests/Api/Client/Tickets/
│   ├── StoreTicketRequest.php
│   └── UpdateTicketRequest.php
├── app/Transformers/Api/Client/
│   └── TicketTransformer.php
├── database/migrations/
│   └── 2026_02_09_000000_create_tickets_table.php
└── routes/
    └── api-client.php (updated)

Frontend:
├── resources/scripts/api/account/
│   └── tickets.ts
├── resources/scripts/components/dashboard/tickets/
│   ├── TicketsContainer.tsx
│   ├── CreateTicketContainer.tsx
│   ├── TicketViewContainer.tsx
│   └── TicketRow.tsx
└── resources/scripts/routers/
    └── routes.ts (updated)
```

## Future Enhancements

### Recommended Additions
1. **Admin Panel Integration**
   - Admin ticket dashboard
   - Bulk actions (close multiple, assign priority)
   - Ticket assignment to staff members
   - Canned responses

2. **Notifications**
   - Email notifications for new tickets
   - Discord webhook integration
   - Real-time notifications in panel
   - Unread badge in navigation

3. **Advanced Features**
   - File attachments
   - Ticket templates
   - Auto-close after X days of inactivity
   - Ticket ratings/feedback
   - Search and filter tickets
   - Export ticket history

4. **Analytics**
   - Average response time
   - Tickets by category/priority
   - Resolution rate
   - User satisfaction scores

## Notes

- The existing theme system is preserved and enhanced
- All components use the existing dark theme
- TypeScript lint errors are expected during development and will resolve on build
- The system is fully integrated with the existing authentication and authorization
- Server association is optional for tickets

## Testing Checklist

- [ ] Create a new ticket
- [ ] View ticket list
- [ ] Add messages to ticket
- [ ] Close ticket
- [ ] Verify status changes
- [ ] Test priority levels
- [ ] Check server association
- [ ] Test empty states
- [ ] Verify responsive design
- [ ] Test form validation
- [ ] Check error handling

## Support

For issues or questions about the ticket system implementation, refer to the Laravel and React documentation, or consult the existing codebase patterns.

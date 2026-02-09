-- Run these commands in your MySQL console to check the existing table structure

-- Show the structure of the tickets table
DESCRIBE tickets;

-- Show the structure of ticket_messages table (if it exists)
DESCRIBE ticket_messages;

-- Check if there's any data in the tables
SELECT COUNT(*) as ticket_count FROM tickets;
SELECT COUNT(*) as message_count FROM ticket_messages;

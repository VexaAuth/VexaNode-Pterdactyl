-- Insert the migration record manually to mark it as completed
-- This tells Laravel that the migration has already been run

INSERT INTO migrations (migration, batch) 
VALUES ('2026_02_09_000000_create_tickets_table', (SELECT COALESCE(MAX(batch), 0) + 1 FROM migrations m));

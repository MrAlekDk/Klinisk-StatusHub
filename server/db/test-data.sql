-- Create Kommune
INSERT INTO organisations (name)
VALUES ('København Kommune');

-- Create test users
INSERT INTO users (name, email, password, last_login, organisation_id)
VALUES 
('Alexander Hansen', 'alexander@example.com', 'hashed_password_here', NULL, 1),
('Maria Jensen', 'maria@example.com', 'hashed_password_here', NULL, 1);

-- Create test systems
INSERT INTO systems (organisation_id, name, link)
VALUES
(1, 'Dental Journal System', 'https://journal.example.com/healthcheck'),
(1, 'Appointment Booking', 'https://booking.example.com/status'),
(1, 'X-Ray Imaging Server', 'https://xray.example.com/ping');

-- Create test system statuses (log)
INSERT INTO system_statuses (system_id, status, message)
VALUES
(1, 'OK', 'System operating normally'),
(2, 'DEGRADED', 'Slow response times detected'),
(3, 'DOWN', 'Server unreachable');

-- Create contingency plans
INSERT INTO contingency_plans (system_id, content)
VALUES
(1, 'If the Dental Journal System is down, use paper journals temporarily.'),
(2, 'If booking is unavailable, call patients manually.'),
(3, 'If X-Ray server is down, redirect patients to backup clinic.');

-- 6. Insert contacts per system
INSERT INTO contacts (system_id, name, phone, email)
VALUES
(1, 'Lars Mikkelsen', '12345678', 'lars@kbh.dk'),
(2, 'Sofie Holm', '87654321', 'sofie@kbh.dk'),
(3, 'Peter Sørensen', '11223344', 'peter@kbh.dk');
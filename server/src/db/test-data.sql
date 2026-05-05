-- Create Kommune
INSERT INTO organisations (name)
SELECT 'København Kommune'
WHERE NOT EXISTS (
    SELECT 1 FROM organisations WHERE name = 'København Kommune'
);

-- Create test users 
INSERT INTO users (name, email, password, last_login, organisation_id)
SELECT 'Alexander Hansen', 'alexander@example.com', 'hashed_password_here', NULL, 1
WHERE NOT EXISTS (
    SELECT 1 FROM users WHERE email = 'alexander@example.com'
);

INSERT INTO users (name, email, password, last_login, organisation_id)
SELECT 'Maria Jensen', 'maria@example.com', 'hashed_password_here', NULL, 1
WHERE NOT EXISTS (
    SELECT 1 FROM users WHERE email = 'maria@example.com'
);

-- Create test systems
INSERT INTO systems (organisation_id, name, link)
SELECT 1, 'Dental Journal System', 'https://journal.example.com/healthcheck'
WHERE NOT EXISTS (
    SELECT 1 FROM systems WHERE name = 'Dental Journal System'
);

INSERT INTO systems (organisation_id, name, link)
SELECT 1, 'Appointment Booking', 'https://booking.example.com/status'
WHERE NOT EXISTS (
    SELECT 1 FROM systems WHERE name = 'Appointment Booking'
);

INSERT INTO systems (organisation_id, name, link)
SELECT 1, 'X-Ray Imaging Server', 'https://xray.example.com/ping'
WHERE NOT EXISTS (
    SELECT 1 FROM systems WHERE name = 'X-Ray Imaging Server'
);

-- Create test system statuses
INSERT INTO system_statuses (system_id, status, message)
SELECT 1, 'OK', 'System operating normally'
WHERE NOT EXISTS (
    SELECT 1 FROM system_statuses WHERE system_id = 1
);

INSERT INTO system_statuses (system_id, status, message)
SELECT 2, 'DEGRADED', 'Slow response times detected'
WHERE NOT EXISTS (
    SELECT 1 FROM system_statuses WHERE system_id = 2
);

INSERT INTO system_statuses (system_id, status, message)
SELECT 3, 'DOWN', 'Server unreachable'
WHERE NOT EXISTS (
    SELECT 1 FROM system_statuses WHERE system_id = 3
);

-- Create contingency plans
INSERT INTO contingency_plans (system_id, content)
SELECT 1, 'If the Dental Journal System is down, use paper journals temporarily.'
WHERE NOT EXISTS (
    SELECT 1 FROM contingency_plans WHERE system_id = 1
);

INSERT INTO contingency_plans (system_id, content)
SELECT 2, 'If booking is unavailable, call patients manually.'
WHERE NOT EXISTS (
    SELECT 1 FROM contingency_plans WHERE system_id = 2
);

INSERT INTO contingency_plans (system_id, content)
SELECT 3, 'If X-Ray server is down, redirect patients to backup clinic.'
WHERE NOT EXISTS (
    SELECT 1 FROM contingency_plans WHERE system_id = 3
);

-- Insert contacts per system
INSERT INTO contacts (system_id, name, phone, email)
SELECT 1, 'Lars Mikkelsen', '12345678', 'lars@kbh.dk'
WHERE NOT EXISTS (
    SELECT 1 FROM contacts WHERE email = 'lars@kbh.dk'
);

INSERT INTO contacts (system_id, name, phone, email)
SELECT 2, 'Sofie Holm', '87654321', 'sofie@kbh.dk'
WHERE NOT EXISTS (
    SELECT 1 FROM contacts WHERE email = 'sofie@kbh.dk'
);

INSERT INTO contacts (system_id, name, phone, email)
SELECT 3, 'Peter Sørensen', '11223344', 'peter@kbh.dk'
WHERE NOT EXISTS (
    SELECT 1 FROM contacts WHERE email = 'peter@kbh.dk'
);

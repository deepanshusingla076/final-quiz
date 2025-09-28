-- Create sample users for testing
INSERT INTO users (username, email, password, first_name, last_name, role, is_active, is_verified, created_at, updated_at) 
VALUES 
('teacher', 'teacher@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Teacher', 'User', 'TEACHER', 1, 1, NOW(), NOW()),
('student', 'student@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Student', 'User', 'STUDENT', 1, 1, NOW(), NOW())
ON DUPLICATE KEY UPDATE 
username=VALUES(username);
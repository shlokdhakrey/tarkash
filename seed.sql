-- InnovateX 2025 Seed Data
-- Run this with: Get-Content seed.sql | docker exec -i innovatex-postgres psql -U daddy -d innovatex

-- Clear existing data
TRUNCATE TABLE audit_logs, scores, submissions_on_judges, file_meta, submissions, team_members, teams, judges, refresh_tokens, users, sponsors, announcements, timeline, faqs, rubrics, settings CASCADE;

-- Create Admin User (password: Admin123!)
INSERT INTO users (id, email, password, name, role, institute, created_at, updated_at)
VALUES 
('admin-001', 'admin@innovatex2025.edu', '$2b$10$rI7/eTrzhPznWLsJXuJKIeWKv3BxW1pN0xVdPh3xyFdq5x.v3zqOy', 'InnovateX Admin', 'ADMIN', 'College of Engineering', NOW(), NOW());

-- Create Judge Users (password: Admin123!)
INSERT INTO users (id, email, password, name, role, institute, bio, linkedin, github, created_at, updated_at)
VALUES 
('judge-001', 'judge1@innovatex2025.edu', '$2b$10$rI7/eTrzhPznWLsJXuJKIeWKv3BxW1pN0xVdPh3xyFdq5x.v3zqOy', 'Dr. Sarah Johnson', 'JUDGE', 'MIT', 'Professor of Computer Science with 15 years of experience', 'https://linkedin.com/in/sarahjohnson', NULL, NOW(), NOW()),
('judge-002', 'judge2@innovatex2025.edu', '$2b$10$rI7/eTrzhPznWLsJXuJKIeWKv3BxW1pN0xVdPh3xyFdq5x.v3zqOy', 'Prof. Michael Chen', 'JUDGE', 'Stanford University', 'AI/ML researcher and industry veteran', NULL, 'https://github.com/mchen', NOW(), NOW()),
('judge-003', 'judge3@innovatex2025.edu', '$2b$10$rI7/eTrzhPznWLsJXuJKIeWKv3BxW1pN0xVdPh3xyFdq5x.v3zqOy', 'Dr. Priya Sharma', 'JUDGE', 'IIT Delhi', 'Startup founder and technology evangelist', NULL, NULL, NOW(), NOW());

-- Create Judge records
INSERT INTO judges (id, user_id, bio, expertise, created_at, updated_at)
VALUES 
('judge-rec-001', 'judge-001', 'Professor of Computer Science with 15 years of experience', ARRAY['Innovation', 'Technology', 'Business Model'], NOW(), NOW()),
('judge-rec-002', 'judge-002', 'AI/ML researcher and industry veteran', ARRAY['Innovation', 'Technology', 'Business Model'], NOW(), NOW()),
('judge-rec-003', 'judge-003', 'Startup founder and technology evangelist', ARRAY['Innovation', 'Technology', 'Business Model'], NOW(), NOW());

-- Create Participant Users (password: Admin123!)
INSERT INTO users (id, email, password, name, role, institute, phone, year, created_at, updated_at)
VALUES 
('user-001', 'alice@student.edu', '$2b$10$rI7/eTrzhPznWLsJXuJKIeWKv3BxW1pN0xVdPh3xyFdq5x.v3zqOy', 'Alice Smith', 'PARTICIPANT', 'College of Engineering', '+919876543210', 3, NOW(), NOW()),
('user-002', 'bob@student.edu', '$2b$10$rI7/eTrzhPznWLsJXuJKIeWKv3BxW1pN0xVdPh3xyFdq5x.v3zqOy', 'Bob Johnson', 'PARTICIPANT', 'College of Engineering', '+919876543211', 3, NOW(), NOW()),
('user-003', 'carol@student.edu', '$2b$10$rI7/eTrzhPznWLsJXuJKIeWKv3BxW1pN0xVdPh3xyFdq5x.v3zqOy', 'Carol Williams', 'PARTICIPANT', 'College of Engineering', '+919876543212', 3, NOW(), NOW()),
('user-004', 'dave@student.edu', '$2b$10$rI7/eTrzhPznWLsJXuJKIeWKv3BxW1pN0xVdPh3xyFdq5x.v3zqOy', 'Dave Brown', 'PARTICIPANT', 'Tech Institute', '+919876543213', 2, NOW(), NOW()),
('user-005', 'eve@student.edu', '$2b$10$rI7/eTrzhPznWLsJXuJKIeWKv3BxW1pN0xVdPh3xyFdq5x.v3zqOy', 'Eve Davis', 'PARTICIPANT', 'Tech Institute', '+919876543214', 2, NOW(), NOW()),
('user-006', 'frank@student.edu', '$2b$10$rI7/eTrzhPznWLsJXuJKIeWKv3BxW1pN0xVdPh3xyFdq5x.v3zqOy', 'Frank Miller', 'PARTICIPANT', 'Engineering College', '+919876543215', 4, NOW(), NOW()),
('user-007', 'grace@student.edu', '$2b$10$rI7/eTrzhPznWLsJXuJKIeWKv3BxW1pN0xVdPh3xyFdq5x.v3zqOy', 'Grace Wilson', 'PARTICIPANT', 'Engineering College', '+919876543216', 4, NOW(), NOW()),
('user-008', 'henry@student.edu', '$2b$10$rI7/eTrzhPznWLsJXuJKIeWKv3BxW1pN0xVdPh3xyFdq5x.v3zqOy', 'Henry Moore', 'PARTICIPANT', 'Science College', '+919876543217', 3, NOW(), NOW());

-- Create Teams
INSERT INTO teams (id, name, institute, idea, status, created_at, updated_at)
VALUES 
('team-001', 'Code Crushers', 'College of Engineering', 'AI-powered personal finance assistant', 'APPROVED', NOW(), NOW()),
('team-002', 'Tech Titans', 'Tech Institute', 'Smart waste management system', 'APPROVED', NOW(), NOW()),
('team-003', 'Innovation Squad', 'Engineering College', 'AR-based learning platform', 'APPROVED', NOW(), NOW()),
('team-004', 'Future Builders', 'Science College', 'Blockchain-based voting system', 'PENDING', NOW(), NOW());

-- Create Team Members
INSERT INTO team_members (id, team_id, user_id, is_leader, created_at, updated_at)
VALUES 
('tm-001', 'team-001', 'user-001', true, NOW(), NOW()),
('tm-002', 'team-001', 'user-002', false, NOW(), NOW()),
('tm-003', 'team-001', 'user-003', false, NOW(), NOW()),
('tm-004', 'team-002', 'user-004', true, NOW(), NOW()),
('tm-005', 'team-002', 'user-005', false, NOW(), NOW()),
('tm-006', 'team-003', 'user-006', true, NOW(), NOW()),
('tm-007', 'team-003', 'user-007', false, NOW(), NOW()),
('tm-008', 'team-004', 'user-008', true, NOW(), NOW());

-- Create Submissions
INSERT INTO submissions (id, team_id, title, description, status, submitted_at, created_at, updated_at)
VALUES 
('sub-001', 'team-001', 'FinanceAI - Your Smart Money Manager', 'An AI-powered mobile app that helps users manage their finances with personalized insights and automated savings recommendations.', 'UNDER_REVIEW', NOW(), NOW(), NOW()),
('sub-002', 'team-002', 'WasteWise - Smart City Solution', 'IoT-enabled waste management system that optimizes collection routes and promotes recycling through gamification.', 'UNDER_REVIEW', NOW(), NOW(), NOW()),
('sub-003', 'team-003', 'LearnAR - Augmented Reality Education', 'AR platform that brings textbooks to life with 3D models, interactive simulations, and immersive learning experiences.', 'UNDER_REVIEW', NOW(), NOW(), NOW());

-- Create Sponsors
INSERT INTO sponsors (id, name, tier, logo, website, description, created_at, updated_at)
VALUES 
('sponsor-001', 'TechCorp Inc.', 'PLATINUM', 'https://via.placeholder.com/200x80?text=TechCorp', 'https://techcorp.example.com', 'Leading technology solutions provider', NOW(), NOW()),
('sponsor-002', 'InnovateLabs', 'GOLD', 'https://via.placeholder.com/200x80?text=InnovateLabs', 'https://innovatelabs.example.com', 'Innovation and research company', NOW(), NOW()),
('sponsor-003', 'StartupHub', 'GOLD', 'https://via.placeholder.com/200x80?text=StartupHub', 'https://startuphub.example.com', 'Startup incubator and accelerator', NOW(), NOW()),
('sponsor-004', 'CodeAcademy', 'SILVER', 'https://via.placeholder.com/200x80?text=CodeAcademy', 'https://codeacademy.example.com', 'Online coding education platform', NOW(), NOW()),
('sponsor-005', 'CloudServe', 'BRONZE', 'https://via.placeholder.com/200x80?text=CloudServe', 'https://cloudserve.example.com', 'Cloud hosting services', NOW(), NOW());

-- Create Timeline Events
INSERT INTO timeline (id, title, description, datetime, location, created_at, updated_at)
VALUES 
('tl-001', 'Registration Opens', 'Start registering your teams!', '2025-02-01 00:00:00+05:30', 'Online', NOW(), NOW()),
('tl-002', 'Registration Closes', 'Last date to register', '2025-03-10 23:59:59+05:30', 'Online', NOW(), NOW()),
('tl-003', 'Opening Ceremony', 'Kickoff event with keynote speakers', '2025-03-15 09:00:00+05:30', 'Main Auditorium', NOW(), NOW()),
('tl-004', 'Hacking Begins', 'Let the coding commence!', '2025-03-15 10:00:00+05:30', 'Hackathon Arena', NOW(), NOW()),
('tl-005', 'Lunch Break', 'Networking and meals', '2025-03-15 13:00:00+05:30', 'Cafeteria', NOW(), NOW()),
('tl-006', 'Mentor Sessions', 'Get guidance from industry experts', '2025-03-15 15:00:00+05:30', 'Mentor Rooms', NOW(), NOW()),
('tl-007', 'Midnight Snacks', 'Fuel for late-night coding', '2025-03-16 00:00:00+05:30', 'Cafeteria', NOW(), NOW()),
('tl-008', 'Submission Deadline', 'All projects must be submitted', '2025-03-17 09:00:00+05:30', 'Online', NOW(), NOW()),
('tl-009', 'Final Presentations', 'Top teams present to judges', '2025-03-17 10:00:00+05:30', 'Main Auditorium', NOW(), NOW()),
('tl-010', 'Award Ceremony', 'Winners announcement and prizes', '2025-03-17 16:00:00+05:30', 'Main Auditorium', NOW(), NOW());

-- Create FAQs
INSERT INTO faqs (id, question, answer, category, priority, created_at, updated_at)
VALUES 
('faq-001', 'Who can participate?', 'Any student currently enrolled in an educational institution can participate. Professional developers are not eligible.', 'GENERAL', 'HIGH', NOW(), NOW()),
('faq-002', 'What is the team size?', 'Teams must have 2-4 members. Solo participation is not allowed.', 'GENERAL', 'HIGH', NOW(), NOW()),
('faq-003', 'Do I need to pay a registration fee?', 'No, InnovateX 2025 is completely free to participate!', 'REGISTRATION', 'HIGH', NOW(), NOW()),
('faq-004', 'What should I bring?', 'Bring your laptop, chargers, student ID, and enthusiasm! Food and swag will be provided.', 'GENERAL', 'MEDIUM', NOW(), NOW()),
('faq-005', 'Will there be mentors available?', 'Yes! Industry experts will be available throughout the event to help with technical and business challenges.', 'GENERAL', 'MEDIUM', NOW(), NOW());

-- Create Announcements
INSERT INTO announcements (id, title, content, priority, pinned, published_at, created_at, updated_at)
VALUES 
('ann-001', 'Welcome to InnovateX 2025!', 'Registration is now open! Form your teams and register before March 10th.', 'HIGH', true, NOW(), NOW(), NOW()),
('ann-002', 'Sponsor Announcement', 'We''re thrilled to announce TechCorp Inc. as our Platinum Sponsor!', 'MEDIUM', true, NOW(), NOW(), NOW()),
('ann-003', 'Mentorship Program', 'Industry mentors will be available throughout the hackathon. Book your sessions in advance!', 'MEDIUM', false, NOW(), NOW(), NOW());

-- Create Judging Rubric
INSERT INTO rubrics (id, name, description, criteria, created_at, updated_at)
VALUES 
('rubric-001', 'InnovateX 2025 Official Rubric', 'Standard judging criteria for all submissions', 
'{"innovation": {"weight": 30, "description": "Originality and creativity of the idea"}, "technical": {"weight": 25, "description": "Technical implementation and code quality"}, "impact": {"weight": 25, "description": "Potential real-world impact and scalability"}, "presentation": {"weight": 10, "description": "Quality of demo and pitch"}, "design": {"weight": 10, "description": "UI/UX design and user experience"}}'::jsonb, 
NOW(), NOW());

-- Create Settings
INSERT INTO settings (id, key, value, created_at, updated_at)
VALUES 
('setting-001', 'registration_open', 'true', NOW(), NOW()),
('setting-002', 'submission_open', 'true', NOW(), NOW()),
('setting-003', 'max_team_size', '4', NOW(), NOW()),
('setting-004', 'min_team_size', '2', NOW(), NOW());

-- Log completion
\echo '✅ Seed data inserted successfully!'
\echo '📊 Summary:'
SELECT 'Users' as table, COUNT(*) as count FROM users
UNION ALL SELECT 'Teams', COUNT(*) FROM teams
UNION ALL SELECT 'Submissions', COUNT(*) FROM submissions
UNION ALL SELECT 'Sponsors', COUNT(*) FROM sponsors
UNION ALL SELECT 'Timeline Events', COUNT(*) FROM timeline
UNION ALL SELECT 'FAQs', COUNT(*) FROM faqs
UNION ALL SELECT 'Announcements', COUNT(*) FROM announcements;

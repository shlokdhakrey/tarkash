-- Quick seed: just admin user
INSERT INTO users (id, email, password, name, role, institute, "createdAt", "updatedAt")
VALUES ('admin-001', 'admin@innovatex2025.edu', '$2b$10$rI7/eTrzhPznWLsJXuJKIeWKv3BxW1pN0xVdPh3xyFdq5x.v3zqOy', 'InnovateX Admin', 'ADMIN', 'College of Engineering', NOW(), NOW());

SELECT 'Admin user created: ' || email as status FROM users WHERE role = 'ADMIN';

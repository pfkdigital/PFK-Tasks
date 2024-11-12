-- Seed data for a single user
INSERT INTO users (id, username, password, email, bio, location, display_image_url, activation_token,
                   activation_token_expiry_date, provider, is_enabled, is_account_non_expired, is_account_non_locked,
                   is_credentials_non_expired, role, created_date, last_modified_date) VALUES
    ('user1', 'john_doe', 'hashedpassword', 'john.doe@example.com', 'Experienced software developer with a passion for technology.',
     'New York, USA', 'https://example.com/images/john_doe.jpg', 'activation-token-123', '2024-12-31', 'LOCAL',
     TRUE, TRUE, TRUE, TRUE, 'ADMIN', NOW(), NOW());


-- Seed data for projects with realistic names
INSERT INTO projects (id, title, image_url, user_id, created_date, last_modified_date) VALUES
                                                                                           ('project1', 'E-Commerce Platform', 'https://example.com/images/ecommerce.png', 'user1', NOW(), NOW()),
                                                                                           ('project2', 'Healthcare Management System', 'https://example.com/images/healthcare.png', 'user1', NOW(), NOW()),
                                                                                           ('project3', 'Social Media Dashboard', 'https://example.com/images/social.png', 'user1', NOW(), NOW()),
                                                                                           ('project4', 'Task Manager App', 'https://example.com/images/task.png', 'user1', NOW(), NOW()),
                                                                                           ('project5', 'Financial Portfolio Tracker', 'https://example.com/images/finance.png', 'user1', NOW(), NOW());

-- Seed data for tasks with realistic names and associated projects
INSERT INTO tasks (id, title, description, status, priority, project_id, user_id, created_date, last_modified_date) VALUES
                                                                                                                        ('task1', 'Product Catalog Development', 'Develop the product catalog for the E-Commerce Platform', 'OPEN', 'HIGH', 'project1', 'user1', NOW(), NOW()),
                                                                                                                        ('task2', 'Payment Integration', 'Integrate payment gateway for the E-Commerce Platform', 'OPEN', 'MEDIUM', 'project1', 'user1', NOW(), NOW()),
                                                                                                                        ('task3', 'Patient Record System', 'Design and implement patient records for Healthcare System', 'IN_PROGRESS', 'HIGH', 'project2', 'user1', NOW(), NOW()),
                                                                                                                        ('task4', 'Analytics Dashboard', 'Create a dashboard to analyze social media data', 'OPEN', 'HIGH', 'project3', 'user1', NOW(), NOW()),
                                                                                                                        ('task5', 'Task Management UI', 'Develop user interface for task management', 'OPEN', 'MEDIUM', 'project4', 'user1', NOW(), NOW()),
                                                                                                                        ('task6', 'Investment API Integration', 'Fetch real-time data for financial portfolio tracking', 'OPEN', 'HIGH', 'project5', 'user1', NOW(), NOW());

-- Seed data for task steps associated with each task
INSERT INTO task_steps (id, title, description, status, task_id, created_date, last_modified_date) VALUES
                                                                                                       ('step1', 'Define Product Schema', 'Design database schema for product catalog', 'COMPLETED', 'task1', NOW(), NOW()),
                                                                                                       ('step2', 'Create API for Products', 'Develop REST API to manage products', 'IN_PROGRESS', 'task1', NOW(), NOW()),
                                                                                                       ('step3', 'Setup Payment Gateway', 'Configure the payment processor and sandbox testing', 'OPEN', 'task2', NOW(), NOW()),
                                                                                                       ('step4', 'Implement Payment Confirmation', 'Add functionality to confirm payments after transactions', 'OPEN', 'task2', NOW(), NOW()),
                                                                                                       ('step5', 'Database Schema for Patients', 'Design database for patient records', 'COMPLETED', 'task3', NOW(), NOW()),
                                                                                                       ('step6', 'Patient Data Encryption', 'Implement encryption for sensitive patient data', 'IN_PROGRESS', 'task3', NOW(), NOW()),
                                                                                                       ('step7', 'Create Social API Endpoints', 'Create API to fetch data from social media', 'OPEN', 'task4', NOW(), NOW()),
                                                                                                       ('step8', 'Frontend Dashboard for Analytics', 'Develop frontend for data display and visualization', 'OPEN', 'task4', NOW(), NOW()),
                                                                                                       ('step9', 'Design Task List UI', 'Create UI layout for task lists', 'OPEN', 'task5', NOW(), NOW()),
                                                                                                       ('step10', 'Add Drag-and-Drop Feature', 'Implement drag-and-drop functionality for task rearrangement', 'OPEN', 'task5', NOW(), NOW()),
                                                                                                       ('step11', 'Configure Stock Market API', 'Integrate stock market API for real-time data', 'OPEN', 'task6', NOW(), NOW()),
                                                                                                       ('step12', 'Portfolio Performance Graph', 'Develop graph visualization for portfolio data', 'OPEN', 'task6', NOW(), NOW());

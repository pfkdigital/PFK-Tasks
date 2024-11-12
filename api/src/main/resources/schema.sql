-- Create the 'users' table
CREATE TABLE IF NOT EXISTS users
(
    id                           VARCHAR(255) PRIMARY KEY, -- Assuming ID is a String (UUID or custom format)
    username                     VARCHAR(255) NOT NULL UNIQUE,
    password                     VARCHAR(255) NOT NULL,
    email                        VARCHAR(255) NOT NULL,
    bio                          TEXT,
    location                     VARCHAR(255),
    display_image_url            VARCHAR(255),
    activation_token             VARCHAR(255),
    activation_token_expiry_date DATE,
    provider                     VARCHAR(50),
    is_enabled                   BOOLEAN      NOT NULL DEFAULT TRUE,
    is_account_non_expired       BOOLEAN      NOT NULL DEFAULT TRUE,
    is_account_non_locked        BOOLEAN      NOT NULL DEFAULT TRUE,
    is_credentials_non_expired   BOOLEAN      NOT NULL DEFAULT TRUE,
    role                         VARCHAR(50)  NOT NULL,    -- Example: USER, ADMIN, etc.
    created_date                 TIMESTAMP             DEFAULT CURRENT_TIMESTAMP,
    last_modified_date           TIMESTAMP             DEFAULT CURRENT_TIMESTAMP
);

-- Create the 'projects' table
CREATE TABLE IF NOT EXISTS projects
(
    id                 VARCHAR(255) PRIMARY KEY,
    title              VARCHAR(255) NOT NULL,
    image_url          VARCHAR(255),
    user_id            VARCHAR(255), -- Foreign key for users table
    created_date       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_modified_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_projects_user FOREIGN KEY (user_id) REFERENCES users (id)
);

-- Create the 'tasks' table
CREATE TABLE IF NOT EXISTS tasks
(
    id                 VARCHAR(255) PRIMARY KEY,
    title              VARCHAR(255) NOT NULL,
    description        TEXT,
    status             VARCHAR(50)  NOT NULL,
    priority           VARCHAR(50),
    project_id         VARCHAR(255), -- Foreign key for projects table
    user_id            VARCHAR(255), -- Foreign key for users table
    created_date       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_modified_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_tasks_project FOREIGN KEY (project_id) REFERENCES projects (id),
    CONSTRAINT fk_tasks_user FOREIGN KEY (user_id) REFERENCES users (id)
);

-- Create the 'task_steps' table
CREATE TABLE IF NOT EXISTS task_steps
(
    id                 VARCHAR(255) PRIMARY KEY, -- Assuming UUID for task steps
    title              VARCHAR(255),
    description        TEXT,
    status             VARCHAR(50),
    task_id            VARCHAR(255),             -- Foreign key for tasks table
    created_date       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_modified_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_task_steps_task FOREIGN KEY (task_id) REFERENCES tasks (id)
);

-- Create indexes for faster searching
CREATE INDEX IF NOT EXISTS idx_projects_user_id ON projects (user_id);
CREATE INDEX IF NOT EXISTS idx_tasks_project_id ON tasks (project_id);
CREATE INDEX IF NOT EXISTS idx_tasks_user_id ON tasks (user_id);
CREATE INDEX IF NOT EXISTS idx_task_steps_task_id ON task_steps (task_id);

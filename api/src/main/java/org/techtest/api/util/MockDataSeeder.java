package org.techtest.api.util;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.techtest.api.entity.User;
import org.techtest.api.entity.Project;
import org.techtest.api.entity.Task;
import org.techtest.api.entity.TaskStep;
import org.techtest.api.enums.Role;
import org.techtest.api.enums.TaskPriority;
import org.techtest.api.repository.ProjectRepository;
import org.techtest.api.repository.TaskRepository;
import org.techtest.api.repository.TaskStepRepository;
import org.techtest.api.repository.UserRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Component
@RequiredArgsConstructor
public class MockDataSeeder {

    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;
    private final TaskRepository taskRepository;
    private final TaskStepRepository taskStepRepository;

    public void run() {
        // Create a mock user
        User user = User.builder()
                .username("nali619")
                .password("$2a$10$lmn8KmKSZqFepKhfsxXnmeAGWZKS4Ou1Ts.aYHGLxPaRUUyU74d/2")
                .email("nuh_mali@hotmail.co.uk")
                .bio("Experienced software developer with a passion for technology.")
                .location("New York, USA")
                .displayImageUrl("https://example.com/images/john_doe.jpg")
                .activationToken("activation-token-123")
                .activationTokenExpiryDate(LocalDate.of(2024, 12, 31))
                .provider("LOCAL")
                .isEnabled(true)
                .isAccountNonExpired(true)
                .isAccountNonLocked(true)
                .isCredentialsNonExpired(true)
                .role(Role.ROLE_USER)
                .build();

        User savedUser = userRepository.save(user);

        // Create mock projects
        List<Project> projects = List.of(
                Project.builder()
                        .title("E-Commerce Platform")
                        .imageUrl("https://example.com/images/ecommerce.png")
                        .description("An e-commerce platform for online shopping.")
                        .startDate(LocalDateTime.now().minusMonths(1))
                        .endDate(LocalDateTime.now().plusMonths(1))
                        .status("IN_PROGRESS")
                        .user(user)
                        .build(),
                Project.builder()
                        .title("Healthcare Management System")
                        .imageUrl("https://example.com/images/healthcare.png")
                        .description("A system to manage healthcare records.")
                        .startDate(LocalDateTime.now().minusMonths(2))
                        .endDate(LocalDateTime.now().plusMonths(2))
                        .status("COMPLETED")
                        .user(user)
                        .build(),
                Project.builder()
                        .title("Social Media Dashboard")
                        .imageUrl("https://example.com/images/social.png")
                        .description("A dashboard for social media analytics.")
                        .startDate(LocalDateTime.now().minusMonths(3))
                        .endDate(LocalDateTime.now().plusMonths(3))
                        .status("NOT_STARTED")
                        .user(user)
                        .build(),
                Project.builder()
                        .title("Task Manager App")
                        .imageUrl("https://example.com/images/task.png")
                        .description("An app to manage tasks and projects.")
                        .startDate(LocalDateTime.now().minusMonths(4))
                        .endDate(LocalDateTime.now().plusMonths(4))
                        .status("IN_PROGRESS")
                        .user(user)
                        .build(),
                Project.builder()
                        .title("Financial Portfolio Tracker")
                        .imageUrl("https://example.com/images/finance.png")
                        .description("A tool to track financial portfolios.")
                        .startDate(LocalDateTime.now().minusMonths(5))
                        .endDate(LocalDateTime.now().plusMonths(5))
                        .status("COMPLETED")
                        .user(user)
                        .build(),
                Project.builder()
                        .title("Inventory Management System")
                        .imageUrl("https://example.com/images/inventory.png")
                        .description("A system to manage inventory.")
                        .startDate(LocalDateTime.now().minusMonths(6))
                        .endDate(LocalDateTime.now().plusMonths(6))
                        .status("NOT_STARTED")
                        .user(user)
                        .build()
        );

        projectRepository.saveAll(projects);
        projects.forEach(savedUser::addProject);

        List<Project> savedProjects = projectRepository.findAll();
        // Create mock tasks for each project
        int taskCounter = 1;
        for (Project project : savedProjects) {
            for (int i = 1; i <= 2; i++) {
                Task task = Task.builder()
                        .title("Task " + taskCounter)
                        .description("Description for Task " + taskCounter)
                        .status(i == 1 ? "OPEN" : "IN_PROGRESS")
                        .priority(TaskPriority.valueOf(i == 1 ? "HIGH" : "MEDIUM"))
                        .project(project)
                        .build();

                project.addTask(task);
                task.setUser(savedUser);
                Task savedTask = taskRepository.save(task);
                projectRepository.save(project);
                taskCounter++;

                // Create mock task steps for each task
                for (int j = 1; j <= 4; j++) {
                    TaskStep taskStep = TaskStep.builder()
                            .title("Step " + j + " for Task " + (taskCounter - 1))
                            .description("Description for Step " + j + " of Task " + (taskCounter - 1))
                            .status(j <= 2 ? "COMPLETED" : "OPEN")
                            .task(savedTask)
                            .build();
                    taskStepRepository.save(taskStep);
                }
            }
        }
    }
}
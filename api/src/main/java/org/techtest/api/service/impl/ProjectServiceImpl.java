package org.techtest.api.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.techtest.api.dto.request.ProjectRequest;
import org.techtest.api.dto.request.TaskRequest;
import org.techtest.api.dto.response.ProjectResponse;
import org.techtest.api.entity.Project;
import org.techtest.api.entity.Task;
import org.techtest.api.entity.User;
import org.techtest.api.exception.ProjectNotFoundException;
import org.techtest.api.exception.TaskNotFoundException;
import org.techtest.api.mapper.ProjectMapper;
import org.techtest.api.mapper.TaskMapper;
import org.techtest.api.repository.ProjectRepository;
import org.techtest.api.repository.TaskRepository;
import org.techtest.api.service.ProjectService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;
    private final ProjectMapper projectMapper;
    private final TaskMapper taskMapper;
    private final TaskRepository taskRepository;

    public ProjectResponse createProject(ProjectRequest projectRequest) {
        Project project = projectMapper.mapToEntity(projectRequest);

        project.setTasks(List.of());

        User currentUser = getCurrentUser();

        project.setUser(currentUser);

        Project savedTaskList = projectRepository.save(project);

        return projectMapper.mapToDto(savedTaskList);
    }

    public List<ProjectResponse> getProjects() {
        User currentUser = getCurrentUser();
        List<Project> projects = projectRepository.findProjectsByUserId(currentUser.getId());

        return projects.stream().map(projectMapper::mapToDto).toList();
    }

    public ProjectResponse getProjectById(Integer id) {
        User currentUser = getCurrentUser();

        Project project =
                projectRepository
                        .findProjectByIdAndUserId(id, currentUser.getId())
                        .orElseThrow(() -> new ProjectNotFoundException("Project not found with id: " + id));

        return projectMapper.mapToDto(project);
    }

    public ProjectResponse updateProjectById(Integer id, ProjectRequest projectRequest) {
        User currentUser = getCurrentUser();

        Project project =
                projectRepository
                        .findProjectByIdAndUserId(id, currentUser.getId())
                        .orElseThrow(() -> new ProjectNotFoundException("Project not found with id: " + id));

        project.setTitle(projectRequest.getTitle());
        project.setImageUrl(projectRequest.getImageUrl());

        Project updatedProject = projectRepository.save(project);

        return projectMapper.mapToDto(updatedProject);
    }

    public ProjectResponse addTaskToProject(Integer id, TaskRequest taskRequest) {
        User currentUser = getCurrentUser();

        Project project =
                projectRepository
                        .findProjectByIdAndUserId(id, currentUser.getId())
                        .orElseThrow(() -> new ProjectNotFoundException("Project not found with id: " + id));

        Task task = taskMapper.mapToEntity(taskRequest);

        project.addTask(task);

        Project updatedProject = projectRepository.save(project);

        return projectMapper.mapToDto(updatedProject);
    }

    public ProjectResponse deleteTaskFromProject(Integer id, Integer taskId) {
        User currentUser = getCurrentUser();

        Project project =
                projectRepository
                        .findProjectByIdAndUserId(id, currentUser.getId())
                        .orElseThrow(() -> new ProjectNotFoundException("Project not found with id: " + id));

        Task task =
                taskRepository
                        .findTasksByProjectIdAndUserId(id, currentUser.getId())
                        .orElseThrow(() -> new TaskNotFoundException("Task not found with id: " + taskId));

        project.removeTask(task);

        Project updatedProject = projectRepository.save(project);

        return projectMapper.mapToDto(updatedProject);
    }

    public void deleteProject(Integer id) {
        Project taskList =
                projectRepository
                        .findProjectByIdAndUserId(id, getCurrentUser().getId())
                        .orElseThrow(() -> new ProjectNotFoundException("Project not found with id: " + id));

        projectRepository.delete(taskList);
    }

    private User getCurrentUser() {
        return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }
}

package org.techtest.api.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.techtest.api.dto.request.ProjectRequest;
import org.techtest.api.dto.request.TaskRequest;
import org.techtest.api.dto.response.ProjectResponse;
import org.techtest.api.entity.Project;
import org.techtest.api.entity.Task;
import org.techtest.api.exception.ProjectNotFoundException;
import org.techtest.api.exception.TaskListNotFoundException;
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

    Project savedTaskList = projectRepository.save(project);

    return projectMapper.mapToDto(savedTaskList);
  }

  public List<ProjectResponse> getProjects() {
    List<Project> projects = projectRepository.findAll();

    return projects.stream().map(projectMapper::mapToDto).toList();
  }

  public ProjectResponse getProjectById(String id) {
    Project project =
        projectRepository
            .findById(id)
            .orElseThrow(() -> new ProjectNotFoundException("Project not found with id: " + id));

    return projectMapper.mapToDto(project);
  }

  public ProjectResponse updateProjectById(String id, ProjectRequest projectRequest) {
    Project project =
        projectRepository
            .findById(id)
            .orElseThrow(() -> new ProjectNotFoundException("Project not found with id: " + id));

    project.setTitle(projectRequest.getTitle());
    project.setImageUrl(projectRequest.getImageUrl());

    Project updatedProject = projectRepository.save(project);

    return projectMapper.mapToDto(updatedProject);
  }

  public ProjectResponse addTaskToProject(String id, TaskRequest taskRequest) {
    Project project =
        projectRepository
            .findById(id)
            .orElseThrow(() -> new ProjectNotFoundException("Project not found with id: " + id));

    Task task = taskMapper.mapToEntity(taskRequest);

    project.addTask(task);

    Project updatedProject = projectRepository.save(project);

    return projectMapper.mapToDto(updatedProject);
  }

  public ProjectResponse deleteTaskFromProject(String id, String taskId) {
    Project project =
        projectRepository
            .findById(id)
            .orElseThrow(() -> new ProjectNotFoundException("Project not found with id: " + id));

    Task task =
        taskRepository
            .findById(taskId)
            .orElseThrow(() -> new TaskNotFoundException("Task not found with id: " + taskId));

    project.removeTask(task);

    Project updatedProject = projectRepository.save(project);

    return projectMapper.mapToDto(updatedProject);
  }

  public void deleteProject(String id) {
    Project taskList =
        projectRepository
            .findById(id)
            .orElseThrow(() -> new TaskListNotFoundException("Task list not found with id: " + id));

    projectRepository.delete(taskList);
  }
}

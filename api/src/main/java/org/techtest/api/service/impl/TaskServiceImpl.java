package org.techtest.api.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.techtest.api.dto.request.TaskRequest;
import org.techtest.api.dto.response.TaskResponse;
import org.techtest.api.dto.response.TaskStepDTO;
import org.techtest.api.entity.Task;
import org.techtest.api.entity.TaskStep;
import org.techtest.api.enums.TaskStatus;
import org.techtest.api.exception.TaskNotFoundException;
import org.techtest.api.mapper.TaskMapper;
import org.techtest.api.mapper.TaskStepMapper;
import org.techtest.api.repository.TaskRepository;
import org.techtest.api.repository.TaskStepRepository;
import org.techtest.api.service.TaskService;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TaskServiceImpl implements TaskService {

  private final TaskMapper taskMapper;
  private final TaskStepMapper taskStepMapper;
  private final TaskRepository taskRepository;
  private final TaskStepRepository taskStepRepository;

  @Override
  public TaskResponse createTask(TaskRequest request) {
    if (request.getTaskSteps() == null) {
      throw new IllegalArgumentException("A task must have at least one task step");
    }

    Task task =
        Task.builder()
            .title(request.getTitle())
            .description(request.getDescription())
            .status(TaskStatus.PENDING.name())
            .build();

    request.getTaskSteps().stream().map(taskStepMapper::mapToEntity).forEach(task::addTaskStep);

    Task savedTask = taskRepository.save(task);

    return taskMapper.mapToDto(savedTask);
  }

  @Override
  public List<TaskResponse> getTasks() {
    List<Task> tasks = taskRepository.findAll();

    return tasks.stream().map(taskMapper::mapToDto).collect(Collectors.toList());
  }

  @Override
  public TaskResponse getTask(String id) {
    Task task =
        taskRepository
            .findById(id)
            .orElseThrow(() -> new TaskNotFoundException("Task not found with id: " + id));

    return taskMapper.mapToDto(task);
  }

  @Override
  public TaskResponse updateTask(String id, TaskRequest request) {
    Task task =
        taskRepository
            .findById(id)
            .orElseThrow(() -> new TaskNotFoundException("Task not found with id: " + id));

    Task updatedTask = taskMapper.mapToEntity(request);

    task.setTitle(updatedTask.getTitle());
    task.setDescription(updatedTask.getDescription());
    task.setStatus(updatedTask.getStatus());
    task.setTaskSteps(updatedTask.getTaskSteps());

    Task savedTask = taskRepository.save(task);

    return taskMapper.mapToDto(savedTask);
  }

  @Override
  public String updateTaskStatus(String id, String status) {
    Task task =
        taskRepository
            .findById(id)
            .orElseThrow(() -> new TaskNotFoundException("Task not found with id: " + id));

    task.setStatus(status);

    return "Task status of id: " + id + " has been updated to " + status;
  }

  @Override
  public TaskResponse addTaskStep(String id, TaskStepDTO taskStepDTO) {
    Task task =
        taskRepository
            .findById(id)
            .orElseThrow(() -> new TaskNotFoundException("Task not found with id: " + id));

    task.addTaskStep(taskStepMapper.mapToEntity(taskStepDTO));

    Task savedTask = taskRepository.save(task);

    return taskMapper.mapToDto(savedTask);
  }

  @Override
  public TaskResponse deleteTaskStep(String id, String stepId) {
    Task task =
        taskRepository
            .findById(id)
            .orElseThrow(() -> new TaskNotFoundException("Task not found with id: " + id));

    TaskStep taskStep =
        taskStepRepository
            .findById(stepId)
            .orElseThrow(() -> new TaskNotFoundException("Task step not found with id: " + stepId));

    task.removeTaskStep(taskStep);

    Task savedTask = taskRepository.save(task);

    return taskMapper.mapToDto(savedTask);
  }


  @Override
  public String deleteTask(String id) {
    Task task =
        taskRepository
            .findById(id)
            .orElseThrow(() -> new TaskNotFoundException("Task not found with id: " + id));

    taskRepository.delete(task);

    return "Task of id: " + id + " has been deleted successfully";
  }
}

package org.techtest.api.mapper;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.techtest.api.dto.request.TaskRequest;
import org.techtest.api.dto.response.TaskResponse;
import org.techtest.api.entity.Task;

import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class TaskMapper {

  private final TaskStepMapper taskStepMapper;

  public TaskResponse mapToDto(Task newTask) {
    return TaskResponse.builder()
        .id(newTask.getId())
        .title(newTask.getTitle())
        .description(newTask.getDescription())
        .status(newTask.getStatus())
        .taskSteps(
            newTask.getTaskSteps().stream()
                .map(taskStep -> taskStepMapper.mapToDTO(taskStep))
                .collect(Collectors.toList()))
        .build();
  }

  public Task mapToEntity(TaskRequest request) {
    Task task =
        Task.builder()
            .title(request.getTitle())
            .description(request.getDescription())
            .status(request.getStatus())
            .build();
    request.getTaskSteps().stream().map(taskStepMapper::mapToEntity).forEach(task::addTaskStep);
    return task;
  }
}

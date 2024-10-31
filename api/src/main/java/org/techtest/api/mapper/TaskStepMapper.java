package org.techtest.api.mapper;

import org.springframework.stereotype.Component;
import org.techtest.api.dto.response.TaskStepDTO;
import org.techtest.api.entity.TaskStep;

@Component
public class TaskStepMapper {

  public TaskStep mapToEntity(TaskStepDTO taskStepDTO) {
    return TaskStep.builder()
        .id(taskStepDTO.getId())
        .title(taskStepDTO.getTitle())
        .description(taskStepDTO.getDescription())
        .status(taskStepDTO.getStatus())
        .build();
  }

  public TaskStepDTO mapToDTO(TaskStep taskStep) {
    return TaskStepDTO.builder()
        .id(taskStep.getId())
        .title(taskStep.getTitle())
        .description(taskStep.getDescription())
        .status(taskStep.getStatus())
        .build();
  }
}

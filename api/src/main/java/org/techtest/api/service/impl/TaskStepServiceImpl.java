package org.techtest.api.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.techtest.api.dto.response.TaskStepDTO;
import org.techtest.api.entity.TaskStep;
import org.techtest.api.entity.User;
import org.techtest.api.exception.TaskStepNotFoundException;
import org.techtest.api.repository.TaskStepRepository;
import org.techtest.api.service.TaskStepService;

@Service
@RequiredArgsConstructor
public class TaskStepServiceImpl implements TaskStepService {

  private final TaskStepRepository taskStepRepository;

  @Override
  public void updateTaskStep(Integer taskStepId, TaskStepDTO taskStepDTO) {
    User currentUser = getCurrentUser();

    TaskStep taskStep =
        taskStepRepository
            .findByTaskIdAndUserId(taskStepId, currentUser.getId())
            .orElseThrow(() -> new TaskStepNotFoundException("Task step not found with id: " + taskStepId));

    taskStep.setTitle(taskStepDTO.getTitle());
    taskStep.setDescription(taskStepDTO.getDescription());
    taskStep.setStatus(taskStepDTO.getStatus());

    taskStepRepository.save(taskStep);
  }

  private User getCurrentUser() {
    return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
  }
}

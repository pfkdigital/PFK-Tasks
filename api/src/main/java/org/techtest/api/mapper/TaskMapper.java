package org.techtest.api.mapper;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.techtest.api.dto.request.TaskRequest;
import org.techtest.api.dto.response.TaskResponse;
import org.techtest.api.entity.Task;
import org.techtest.api.enums.TaskPriority;

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
                .priority(newTask.getPriority().name())
                .taskSteps(
                        newTask.getTaskSteps().stream()
                                .map(taskStepMapper::mapToDTO)
                                .collect(Collectors.toList()))
                .build();
    }

    public Task mapToEntity(TaskRequest request) {
        Task task =
                Task.builder()
                        .title(request.getTitle())
                        .description(request.getDescription())
                        .status(request.getStatus())
                        .priority(TaskPriority.valueOf(request.getPriority()))
                        .build();
        request.getTaskSteps().stream().map(taskStepMapper::mapToEntity).forEach(task::addTaskStep);
        return task;
    }
}

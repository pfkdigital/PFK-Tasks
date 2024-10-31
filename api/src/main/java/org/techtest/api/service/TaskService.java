package org.techtest.api.service;

import org.techtest.api.dto.request.TaskRequest;
import org.techtest.api.dto.response.TaskResponse;
import org.techtest.api.dto.response.TaskStepDTO;
import org.techtest.api.enums.TaskStatus;

import java.util.List;

public interface TaskService {
    TaskResponse createTask(TaskRequest request);
    List<TaskResponse> getTasks();
    TaskResponse getTask(String id);
    TaskResponse updateTask(String id, TaskRequest request);
    String updateTaskStatus(String id, String status);
    TaskResponse addTaskStep(String id, TaskStepDTO taskStepDTO);
    TaskResponse deleteTaskStep(String id, String stepId);
    String deleteTask(String id);
}

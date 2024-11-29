package org.techtest.api.service;

import org.techtest.api.dto.request.TaskRequest;
import org.techtest.api.dto.response.TaskResponse;
import org.techtest.api.dto.response.TaskStepDTO;

import java.util.List;

public interface TaskService {
    TaskResponse createTask(TaskRequest request);
    List<TaskResponse> getTasks();
    TaskResponse getTask(Integer id);
    TaskResponse updateTask(Integer id, TaskRequest request);
    String updateTaskStatus(Integer id, String status);
    TaskResponse addTaskStep(Integer id, TaskStepDTO taskStepDTO);
    TaskResponse deleteTaskStep(Integer id, Integer stepId);
    String deleteTask(Integer id);
}

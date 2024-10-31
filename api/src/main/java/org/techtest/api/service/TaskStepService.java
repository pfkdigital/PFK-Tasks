package org.techtest.api.service;

import org.techtest.api.dto.response.TaskStepDTO;

public interface TaskStepService {
    void updateTaskStep(String taskStepId, TaskStepDTO taskStepDTO);
}

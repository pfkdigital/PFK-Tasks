package org.techtest.api.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TaskResponse {
    private Integer id;
    private String title;
    private String description;
    private String status;
    private String priority;
    private List<TaskStepDTO> taskSteps;
}

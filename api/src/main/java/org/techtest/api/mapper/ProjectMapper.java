package org.techtest.api.mapper;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.techtest.api.dto.request.ProjectRequest;
import org.techtest.api.dto.response.ProjectResponse;
import org.techtest.api.dto.response.TaskResponse;
import org.techtest.api.entity.Project;

import java.util.List;

@Component
@RequiredArgsConstructor
public class ProjectMapper {

    private final TaskMapper taskMapper;

    public Project mapToEntity(ProjectRequest request) {
        return Project
                .builder()
                .title(request.getTitle())
                .imageUrl(request.getImageUrl())
                .description(request.getDescription())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .status(request.getStatus())
                .build();
    }

    public ProjectResponse mapToDto(Project project) {
        List<TaskResponse> tasks = project.getTasks().stream().map(taskMapper::mapToDto).toList();

        return ProjectResponse
                .builder()
                .id(project.getId())
                .title(project.getTitle())
                .imageUrl(project.getImageUrl())
                .description(project.getDescription())
                .startDate(project.getStartDate())
                .endDate(project.getEndDate())
                .status(project.getStatus())
                .tasks(tasks)
                .build();
    }
}

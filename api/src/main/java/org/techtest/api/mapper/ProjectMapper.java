package org.techtest.api.mapper;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.techtest.api.dto.request.ProjectRequest;
import org.techtest.api.dto.response.ProjectResponse;
import org.techtest.api.entity.Project;

@Component
@RequiredArgsConstructor
public class ProjectMapper {

  public Project mapToEntity(ProjectRequest request) {
    return Project.builder().title(request.getTitle()).imageUrl(request.getImageUrl()).build();
  }

  public ProjectResponse mapToDto(Project taskList) {
    return ProjectResponse.builder()
        .id(taskList.getId())
        .title(taskList.getTitle())
        .imageUrl(taskList.getImageUrl())
        .build();
  }
}

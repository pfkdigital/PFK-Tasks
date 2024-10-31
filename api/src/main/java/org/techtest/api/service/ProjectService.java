package org.techtest.api.service;

import org.techtest.api.dto.request.ProjectRequest;
import org.techtest.api.dto.request.TaskRequest;
import org.techtest.api.dto.response.ProjectResponse;

import java.util.List;

public interface ProjectService {
  ProjectResponse createProject(ProjectRequest projectRequest);

  List<ProjectResponse> getProjects();

  ProjectResponse getProjectById(String id);

  ProjectResponse updateProjectById(String id, ProjectRequest projectRequest);

  ProjectResponse addTaskToProject(String id, TaskRequest taskRequest);

  ProjectResponse deleteTaskFromProject(String id, String taskId);

  void deleteProject(String id);
}

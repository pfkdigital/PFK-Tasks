package org.techtest.api.service;

import org.techtest.api.dto.request.ProjectRequest;
import org.techtest.api.dto.request.TaskRequest;
import org.techtest.api.dto.response.ProjectResponse;

import java.util.List;

public interface ProjectService {
  ProjectResponse createProject(ProjectRequest projectRequest);

  List<ProjectResponse> getProjects();

  ProjectResponse getProjectById(Integer id);

  ProjectResponse updateProjectById(Integer id, ProjectRequest projectRequest);

  ProjectResponse addTaskToProject(Integer id, TaskRequest taskRequest);

  ProjectResponse deleteTaskFromProject(Integer id, Integer taskId);

  void deleteProject(Integer id);
}

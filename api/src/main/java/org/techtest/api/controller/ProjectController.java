package org.techtest.api.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.techtest.api.dto.request.ProjectRequest;
import org.techtest.api.dto.request.TaskRequest;
import org.techtest.api.dto.response.ProjectResponse;
import org.techtest.api.service.ProjectService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/projects")
@RequiredArgsConstructor
@CacheConfig(cacheNames = "projects",keyGenerator = "customKeyGenerator")
public class ProjectController {

  private final ProjectService projectService;

  @PostMapping
  @CacheEvict(allEntries = true)
  public ResponseEntity<ProjectResponse> createProject(
      @RequestBody ProjectRequest projectRequest) {
    return new ResponseEntity<>(projectService.createProject(projectRequest), HttpStatus.CREATED);
  }

  @GetMapping
  @Cacheable
  public ResponseEntity<List<ProjectResponse>> getProjects() {
    return new ResponseEntity<>(projectService.getProjects(), HttpStatus.OK);
  }

  @GetMapping("/{id}")
  @Cacheable(key = "#id")
  public ResponseEntity<ProjectResponse> getProjectById(@PathVariable String id) {
    return new ResponseEntity<>(projectService.getProjectById(id), HttpStatus.OK);
  }

  @PutMapping("/{id}")
  @CachePut(key = "#id")
  public ResponseEntity<ProjectResponse> updateProject(
      @PathVariable String id, @RequestBody ProjectRequest projectRequest) {
    return new ResponseEntity<>(
        projectService.updateProjectById(id, projectRequest), HttpStatus.OK);
  }

  @PutMapping("/{id}/tasks")
  @CachePut(key = "#id")
  public ResponseEntity<ProjectResponse> addTaskToProject(
      @PathVariable String id, @RequestBody TaskRequest taskRequest) {
    return new ResponseEntity<>(projectService.addTaskToProject(id, taskRequest), HttpStatus.OK);
  }

  @DeleteMapping("/{id}")
  @CacheEvict(key = "#id")
  public ResponseEntity<?> deleteProject(@PathVariable String id) {
    projectService.deleteProject(id);
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }

  @DeleteMapping("/{id}/tasks/{taskId}")
  @CacheEvict(key = "#id")
  public ResponseEntity<ProjectResponse> deleteTaskFromProject(
      @PathVariable String id, @PathVariable String taskId) {
    return new ResponseEntity<>(projectService.deleteTaskFromProject(id, taskId), HttpStatus.OK);
  }
}

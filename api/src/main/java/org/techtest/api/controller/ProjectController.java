package org.techtest.api.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.techtest.api.dto.request.ProjectRequest;
import org.techtest.api.dto.request.TaskRequest;
import org.techtest.api.dto.response.ProjectResponse;
import org.techtest.api.service.ProjectService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/projects")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ROLE_USER')")
public class ProjectController {

    private final ProjectService projectService;

    @PostMapping
    public ResponseEntity<ProjectResponse> createProject(
            @RequestBody ProjectRequest projectRequest) {
        return new ResponseEntity<>(projectService.createProject(projectRequest), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<ProjectResponse>> getProjects() {
        return new ResponseEntity<>(projectService.getProjects(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProjectResponse> getProjectById(@PathVariable Integer id) {
        return new ResponseEntity<>(projectService.getProjectById(id), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProjectResponse> updateProject(
            @PathVariable Integer id, @RequestBody ProjectRequest projectRequest) {
        return new ResponseEntity<>(
                projectService.updateProjectById(id, projectRequest), HttpStatus.OK);
    }

    @PutMapping("/{id}/tasks")
    public ResponseEntity<ProjectResponse> addTaskToProject(
            @PathVariable Integer id, @RequestBody TaskRequest taskRequest) {
        return new ResponseEntity<>(projectService.addTaskToProject(id, taskRequest), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProject(@PathVariable Integer id) {
        projectService.deleteProject(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/{id}/tasks/{taskId}")
    public ResponseEntity<ProjectResponse> deleteTaskFromProject(
            @PathVariable Integer id, @PathVariable Integer taskId) {
        return new ResponseEntity<>(projectService.deleteTaskFromProject(id, taskId), HttpStatus.OK);
    }
}

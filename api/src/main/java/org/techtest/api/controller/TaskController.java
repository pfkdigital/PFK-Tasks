package org.techtest.api.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.techtest.api.dto.request.TaskRequest;
import org.techtest.api.dto.response.TaskResponse;
import org.techtest.api.dto.response.TaskStepDTO;
import org.techtest.api.service.TaskService;

import java.util.List;

@Controller
@RequestMapping("/api/v1/tasks")
@RequiredArgsConstructor
@CacheConfig(cacheNames = "tasks")
public class TaskController {

  private final TaskService taskService;

  @PostMapping
  @CacheEvict(allEntries = true)
  public ResponseEntity<TaskResponse> createTask(@RequestBody TaskRequest request) {
    return ResponseEntity.ok(taskService.createTask(request));
  }

  @GetMapping
  @Cacheable
  public ResponseEntity<List<TaskResponse>> getTasks() {
    return ResponseEntity.ok(taskService.getTasks());
  }

  @GetMapping("/{id}")
  @Cacheable(key = "#id")
  public ResponseEntity<TaskResponse> getTask(@PathVariable String id) {
    return ResponseEntity.ok(taskService.getTask(id));
  }

  @PutMapping("/{id}")
  @CachePut(key = "#id")
  public ResponseEntity<TaskResponse> updateTask(
          @PathVariable String id, @RequestBody TaskRequest request) {
    return ResponseEntity.ok(taskService.updateTask(id, request));
  }

  @PutMapping("/{id}/status/{status}")
  @CachePut(key = "#id")
  public ResponseEntity<String> updateTaskStatus(
          @PathVariable String id, @PathVariable String status) {
    return ResponseEntity.ok(taskService.updateTaskStatus(id, status));
  }

  @PutMapping("/{id}/steps")
  @CachePut(key = "#id")
  public ResponseEntity<TaskResponse> addTaskStep(
          @PathVariable String id, @RequestBody TaskStepDTO request) {
    return ResponseEntity.ok(taskService.addTaskStep(id, request));
  }

  @DeleteMapping("/{id}")
  @CacheEvict(key = "#id")
  public ResponseEntity<String> deleteTask(@PathVariable String id) {
    return ResponseEntity.ok(taskService.deleteTask(id));
  }

  @DeleteMapping("/{id}/steps/{stepId}")
  @CacheEvict(key = "#id")
  public ResponseEntity<TaskResponse> deleteTaskStep(
          @PathVariable String id, @PathVariable String stepId) {
    return ResponseEntity.ok(taskService.deleteTaskStep(id, stepId));
  }
}
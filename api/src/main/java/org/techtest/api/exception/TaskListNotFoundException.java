package org.techtest.api.exception;

public class TaskListNotFoundException extends RuntimeException {
  public TaskListNotFoundException(String message) {
    super(message);
  }
}

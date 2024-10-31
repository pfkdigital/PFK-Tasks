package org.techtest.api.exception;

public class TaskStepNotFoundException extends RuntimeException {
  public TaskStepNotFoundException(String message) {
    super(message);
  }
}

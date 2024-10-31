package org.techtest.api.advise;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.techtest.api.exception.TaskNotFoundException;
import org.techtest.api.model.ApiError;

import java.time.LocalDateTime;

@ControllerAdvice
public class TaskControllerAdvise {
    @ExceptionHandler(TaskNotFoundException.class)
    public ResponseEntity<ApiError> handleTaskNotFoundException(TaskNotFoundException e) {
        ApiError error =
                ApiError.builder()
                        .status(HttpStatus.NOT_FOUND)
                        .code(HttpStatus.NOT_FOUND.value())
                        .timestamp(LocalDateTime.now())
                        .message(e.getMessage())
                        .build();

        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }
}

package org.techtest.api.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class ApiError {
    private String message;
    private HttpStatus status;
    private Integer code;
    private LocalDateTime timestamp;
}

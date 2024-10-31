package org.techtest.api.advise;

import com.resend.core.exception.ResendException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.techtest.api.model.ApiError;

import java.time.LocalDateTime;

@ControllerAdvice
public class AuthControllerAdvise {

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ApiError> handleRuntimeException(RuntimeException exception) {
        ApiError apiError =
                ApiError.builder()
                        .status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .code(HttpStatus.INTERNAL_SERVER_ERROR.value())
                        .timestamp(LocalDateTime.now())
                        .message(exception.getMessage())
                        .build();

        return new ResponseEntity<>(apiError, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(ResendException.class)
    public ResponseEntity<ApiError> handleResendException(ResendException exception) {
        ApiError apiError =
                ApiError.builder()
                        .status(HttpStatus.FORBIDDEN)
                        .code(HttpStatus.FORBIDDEN.value())
                        .timestamp(LocalDateTime.now())
                        .message(exception.getMessage())
                        .build();

        return new ResponseEntity<>(apiError, HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<ApiError> handleUsernameNotFoundException(UsernameNotFoundException exception) {
        ApiError apiError =
                ApiError.builder()
                        .status(HttpStatus.UNAUTHORIZED)
                        .code(HttpStatus.UNAUTHORIZED.value())
                        .timestamp(LocalDateTime.now())
                        .message(exception.getMessage())
                        .build();

        return new ResponseEntity<>(apiError, HttpStatus.UNAUTHORIZED);
    }
}

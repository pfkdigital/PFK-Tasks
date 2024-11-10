package org.techtest.api.controller;

import com.resend.core.exception.ResendException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.techtest.api.dto.request.AuthenticateRequest;
import org.techtest.api.dto.request.ConfirmAccountRequest;
import org.techtest.api.dto.request.RegisterRequest;
import org.techtest.api.service.AuthService;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest)
            throws IOException, ResendException {
        authService.register(registerRequest);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/activate")
    public ResponseEntity<?> activate(@RequestBody ConfirmAccountRequest confirmAccountRequest) {
        authService.activateAccount(confirmAccountRequest);
        return new ResponseEntity<>("Your account is active, please log in", HttpStatus.OK);
    }

    @PostMapping("/authenticate")
    public ResponseEntity<?> authenticate(
            @RequestBody AuthenticateRequest authenticateRequest, HttpServletResponse response) {

        return new ResponseEntity<>(
                authService.authenticate(authenticateRequest, response), HttpStatus.OK);
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(HttpServletRequest request, HttpServletResponse response) {
        return new ResponseEntity<>(authService.refresh(request, response), HttpStatus.OK);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        return new ResponseEntity<>(authService.logout(request), HttpStatus.OK);
    }
}

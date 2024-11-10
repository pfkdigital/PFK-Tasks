package org.techtest.api.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.techtest.api.service.UserService;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ROLE_USER')")
public class UserController {

    private final UserService userService;

    @GetMapping
    public ResponseEntity<?> getUserInfo() {
        return new ResponseEntity<>(userService.getUserInfo(), HttpStatus.OK);
    }
}

package org.techtest.api.service.impl;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.techtest.api.dto.response.UserResponse;
import org.techtest.api.entity.User;
import org.techtest.api.service.UserService;


@Service
public class UserServiceImpl implements UserService {
    public UserResponse getUserInfo() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        var currentUser = (User) authentication.getPrincipal();
        if (currentUser == null) {
            return null;
        }

        return UserResponse.builder()
                .username(currentUser.getUsername())
                .email(currentUser.getEmail())
                .displayImageUrl(currentUser.getDisplayImageUrl())
                .bio(currentUser.getBio())
                .location(currentUser.getLocation())
                .joinedAt(currentUser.getCreatedDate())
                .build();
    }
}

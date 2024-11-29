package org.techtest.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.techtest.api.entity.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,String> {

    Optional<User> findByUsername(String username);
    Optional<User> findUserByActivationToken(String activationToken);
    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);
}

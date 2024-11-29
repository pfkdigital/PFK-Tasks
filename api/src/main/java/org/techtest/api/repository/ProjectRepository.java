package org.techtest.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.techtest.api.entity.Project;

import java.util.List;
import java.util.Optional;

public interface ProjectRepository extends JpaRepository<Project, String> {

    @Query("SELECT p FROM Project p WHERE p.user.id = :userId")
    List<Project> findProjectsByUserId(@Param("userId") Integer userId);

    @Query("SELECT p FROM Project p WHERE p.id = :projectId AND p.user.id = :userId")
    Optional<Project> findProjectByIdAndUserId(@Param("projectId") Integer projectId, @Param("userId") Integer userId);
}

package org.techtest.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.techtest.api.entity.Task;

import java.util.List;
import java.util.Optional;

public interface TaskRepository extends JpaRepository<Task, String> {

    @Query("SELECT t FROM Task t WHERE t.user.id = :userId")
    List<Task> findTaskByUserId(@Param("userId") Integer userId);

    @Query("SELECT t FROM Task t WHERE t.id = :taskId AND t.user.id = :userId")
    Optional<Task> findTaskByIdAndUserId(Integer taskId, Integer userId);

    @Query("SELECT t FROM Task t WHERE t.project.id = :projectId AND t.user.id = :userId")
    Optional<Task> findTasksByProjectIdAndUserId(@Param("projectId") Integer projectId, @Param("userId") Integer userId);
}
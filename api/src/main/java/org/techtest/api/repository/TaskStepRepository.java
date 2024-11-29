package org.techtest.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.techtest.api.entity.TaskStep;

import java.util.Optional;

public interface TaskStepRepository extends JpaRepository<TaskStep,String> {

    @Query("SELECT t FROM TaskStep t WHERE t.task.id = :taskId AND t.user.id = :userId")
    Optional<TaskStep> findByTaskIdAndUserId(Integer taskId, Integer userId);
}

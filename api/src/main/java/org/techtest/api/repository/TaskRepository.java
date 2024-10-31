package org.techtest.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.techtest.api.entity.Task;
import org.techtest.api.enums.TaskStatus;
import org.springframework.transaction.annotation.Transactional;

public interface TaskRepository extends JpaRepository<Task, String> {

    @Modifying
    @Transactional
    @Query("UPDATE Task t SET t.status = :status WHERE t.id = :id")
    void updateTaskStatus(@Param("id") String id, @Param("status") TaskStatus status);
}
package org.techtest.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.techtest.api.entity.TaskStep;

public interface TaskStepRepository extends JpaRepository<TaskStep,String> {}

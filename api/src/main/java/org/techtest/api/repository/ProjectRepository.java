package org.techtest.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.techtest.api.entity.Project;

public interface ProjectRepository extends JpaRepository<Project, String> {}

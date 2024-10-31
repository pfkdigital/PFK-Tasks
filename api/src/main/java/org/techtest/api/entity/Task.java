package org.techtest.api.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tasks")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class Task extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    private String title;
    private String description;
    private String status;

    @ManyToOne
    @JoinColumn(name = "projectId", insertable = false, updatable = false)
    private Project project;

    @ManyToOne
    @JoinColumn(name = "userId", insertable = false, updatable = false)
    private User user;

    @OneToMany(mappedBy = "task", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<TaskStep> taskSteps;

    public void addTaskStep(TaskStep taskStep) {
        if(taskSteps == null) {
            taskSteps = new ArrayList<>();
        }
        taskStep.setTask(this);
        taskSteps.add(taskStep);
    }

    public void removeTaskStep(TaskStep taskStep) {
        taskSteps.remove(taskStep);
    }
}

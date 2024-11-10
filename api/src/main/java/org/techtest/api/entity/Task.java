package org.techtest.api.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;
import org.techtest.api.enums.TaskPriority;

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
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @GenericGenerator(name = "custom-task-id", strategy = "org.techtest.api.util.CustomTaskIdGenerator")
    private String id;
    private String title;
    private String description;
    private String status;

    @Enumerated(EnumType.STRING)
    private TaskPriority priority;

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

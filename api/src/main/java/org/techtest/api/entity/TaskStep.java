package org.techtest.api.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "task-steps")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class TaskStep extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    private String title;
    private String description;
    private String status;

    @ManyToOne
    @JoinColumn(name="taskId",insertable = false, updatable = false)
    private Task task;
}

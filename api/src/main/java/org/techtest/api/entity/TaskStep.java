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
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer id;
    private String title;
    private String description;
    private String status;

    @ManyToOne
    @JoinColumn(name="taskId")
    private Task task;

    @ManyToOne
    @JoinColumn(name="userId")
    private User user;
}

package org.techtest.api.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "projects")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class Project extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @GenericGenerator(name = "custom-project-id", strategy = "org.techtest.api.util.CustomProjectIdGenerator")
    private String id;
    private String title;
    private String imageUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Task> tasks;

    public void addTask(Task task) {
        if(tasks == null) {
            tasks = new ArrayList<>();
        }
        task.setProject(this);
        tasks.add(task);
    }

    public void removeTask(Task task) {
        tasks.remove(task);
    }
}

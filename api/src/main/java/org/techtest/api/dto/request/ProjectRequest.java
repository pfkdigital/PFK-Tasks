package org.techtest.api.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProjectRequest {
    private String title;
    private String imageUrl;
    private String description;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private String status;
}

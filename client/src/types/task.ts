export type TaskPriority = "HIGH" | "MEDIUM" | "LOW"

export interface TaskStep {
    id: string;
    title: string;
    description: string;
    status: string;
    taskId: string;
}

export interface Task {
    id: string;
    title: string;
    description: string;
    status: string;
    priority: TaskPriority;
    projectId: string;
    userId: string;
    taskSteps: TaskStep[];
}
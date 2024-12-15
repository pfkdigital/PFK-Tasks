"use client"

import {Task} from "@/types/task";

interface KanbanBoardProps {
    tasks: Task[]
}

export function KanbanBoard({tasks}: KanbanBoardProps) {
    return (
        <div className={"grid grid-cols-3"}>
            {tasks.map(task => (
                <div key={task.id}>
                    {task.title}
                </div>
            ))}
        </div>
    )
}
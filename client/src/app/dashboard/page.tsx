import { DataTable, Task } from '@/components/data-table'
import { Button } from "@/components/ui/button"

const tasks: Task[] = [
    {
        id: "TASK-8782",
        title: "You can't compress the program without quantifying the open-source SSD pixel!",
        description: "Implement compression algorithm for the program",
        status: "in-progress",
        priority: "HIGH",
        projectId: "PROJ-1",
        userId: "USER-1",
        taskSteps: [
            {
                id: "STEP-1",
                title: "Research compression algorithms",
                description: "Look into various compression techniques",
                status: "completed",
                taskId: "TASK-8782"
            },
            {
                id: "STEP-2",
                title: "Implement chosen algorithm",
                description: "Code the compression function",
                status: "in-progress",
                taskId: "TASK-8782"
            }
        ]
    },
    {
        id: "TASK-7878",
        title: "Try to calculate the EXE feed, maybe it will index the multi-byte pixel!",
        description: "Optimize the EXE feed calculation",
        status: "todo",
        priority: "LOW",
        projectId: "PROJ-2",
        userId: "USER-2",
        taskSteps: []
    },
    {
        id: "TASK-7839",
        title: "We need to bypass the neural TCP card!",
        description: "Implement a bypass for the neural TCP card",
        status: "done",
        priority: "MEDIUM",
        projectId: "PROJ-1",
        userId: "USER-3",
        taskSteps: [
            {
                id: "STEP-1",
                title: "Analyze TCP card structure",
                description: "Study the neural TCP card architecture",
                status: "completed",
                taskId: "TASK-7839"
            },
            {
                id: "STEP-2",
                title: "Develop bypass method",
                description: "Create a method to bypass the TCP card",
                status: "completed",
                taskId: "TASK-7839"
            }
        ]
    },
    {
        id: "TASK-5562",
        title: "The SAS interface is down, bypass the open-source pixel so we can back up the PNG bandwidth!",
        description: "Fix SAS interface and implement PNG bandwidth backup",
        status: "in-progress",
        priority: "HIGH",
        projectId: "PROJ-3",
        userId: "USER-1",
        taskSteps: []
    },
    {
        id: "TASK-8686",
        title: "I'll parse the wireless SSL protocol, that should driver the API panel!",
        description: "Parse wireless SSL protocol to drive the API panel",
        status: "todo",
        priority: "MEDIUM",
        projectId: "PROJ-2",
        userId: "USER-2",
        taskSteps: []
    },
    {
        id: "TASK-8782",
        title: "You can't compress the program without quantifying the open-source SSD pixel!",
        description: "Implement compression algorithm for the program",
        status: "in-progress",
        priority: "HIGH",
        projectId: "PROJ-1",
        userId: "USER-1",
        taskSteps: [
            {
                id: "STEP-1",
                title: "Research compression algorithms",
                description: "Look into various compression techniques",
                status: "completed",
                taskId: "TASK-8782"
            },
            {
                id: "STEP-2",
                title: "Implement chosen algorithm",
                description: "Code the compression function",
                status: "in-progress",
                taskId: "TASK-8782"
            }
        ]
    },
    {
        id: "TASK-7878",
        title: "Try to calculate the EXE feed, maybe it will index the multi-byte pixel!",
        description: "Optimize the EXE feed calculation",
        status: "todo",
        priority: "LOW",
        projectId: "PROJ-2",
        userId: "USER-2",
        taskSteps: []
    },
    {
        id: "TASK-7839",
        title: "We need to bypass the neural TCP card!",
        description: "Implement a bypass for the neural TCP card",
        status: "done",
        priority: "MEDIUM",
        projectId: "PROJ-1",
        userId: "USER-3",
        taskSteps: [
            {
                id: "STEP-1",
                title: "Analyze TCP card structure",
                description: "Study the neural TCP card architecture",
                status: "completed",
                taskId: "TASK-7839"
            },
            {
                id: "STEP-2",
                title: "Develop bypass method",
                description: "Create a method to bypass the TCP card",
                status: "completed",
                taskId: "TASK-7839"
            }
        ]
    },
    {
        id: "TASK-5562",
        title: "The SAS interface is down, bypass the open-source pixel so we can back up the PNG bandwidth!",
        description: "Fix SAS interface and implement PNG bandwidth backup",
        status: "in-progress",
        priority: "HIGH",
        projectId: "PROJ-3",
        userId: "USER-1",
        taskSteps: []
    },
    {
        id: "TASK-8686",
        title: "I'll parse the wireless SSL protocol, that should driver the API panel!",
        description: "Parse wireless SSL protocol to drive the API panel",
        status: "todo",
        priority: "MEDIUM",
        projectId: "PROJ-2",
        userId: "USER-2",
        taskSteps: []
    },
]

export default function TaskPage() {
    return (
        <div className="container mx-auto p-8">
            <div className="flex flex-col space-y-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Task Dashboard</h1>
                        <p className="text-muted-foreground mt-2">
                            View and manage your tasks here
                        </p>
                    </div>
                </div>

                <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                    <div className="p-6">
                        <DataTable data={tasks} />
                    </div>
                </div>
            </div>
        </div>
    )
}
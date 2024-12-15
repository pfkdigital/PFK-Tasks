import {Task} from "./task";
import {TaskStatus} from "@/enum/task-status";

export type ProjectType = {
    id: string;
    title: string;
    imageUrl: string;
    description: string;
    status: keyof typeof TaskStatus;
    priority: string;
    startDate: string;
    endDate: string;
    tasks?: Task[];
};

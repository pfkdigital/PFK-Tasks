import {Task} from "./task";

export type ProjectType = {
    id: string;
    title: string;
    imageUrl: string;
    description: string;
    status: string;
    startDate: string;
    endDate: string;
    tasks?: Task[];
};

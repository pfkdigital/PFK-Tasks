import { Task } from "./task";

export type ProjectType = {
  id: string;
  title: string;
  imageUrl: string;
  tasks?: Task[];
};

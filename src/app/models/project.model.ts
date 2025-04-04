import { Task } from "./task.model";

export interface Project {
    id?: number;
    name: string;
    description: string;
    start_date: string; // Можно заменить на Date, если хочешь парсить даты
    finish_date: string;
    tasks?: Task[];
  }
  
import { type TaskStatus } from "../enums/TaskStatus.js";

export interface ITask {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  deadline: Date;
}

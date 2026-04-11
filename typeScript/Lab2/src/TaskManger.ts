import { BaseRepository } from "./repository/BaseRepository.js";
import { type ITask } from "./interfaces/Itask.js";
import { Timestamp } from "./decorators/Log.js";

@Timestamp
export class TaskManager extends BaseRepository<ITask> {
  constructor() {
    super("tasks_lab_data");
  }

  public getPendingCount(): number {
    return this.items.filter((t) => t.status !== "Completed").length;
  }
}

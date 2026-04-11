var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BaseRepository } from "./repository/BaseRepository.js";
import {} from "./interfaces/Itask.js";
import { Timestamp } from "./decorators/Log.js";
let TaskManager = class TaskManager extends BaseRepository {
    constructor() {
        super("tasks_lab_data");
    }
    getPendingCount() {
        return this.items.filter((t) => t.status !== "Completed").length;
    }
};
TaskManager = __decorate([
    Timestamp
], TaskManager);
export { TaskManager };
//# sourceMappingURL=TaskManger.js.map
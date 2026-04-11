import {} from "./interfaces/Itask.js";
// Repository
export class TaskManger {
    tasks = [
        { id: 1, name: "task 1" },
        { id: 2, name: "task 2" },
    ];
    getAll() {
        return this.tasks;
    }
    addTask(task) {
        console.log("added..");
    }
}
//# sourceMappingURL=TaskManger.js.map
"use strict";
var TaskStatus;
(function (TaskStatus) {
    TaskStatus["pending"] = "Pending";
    TaskStatus["InProgress"] = "InProgress";
    TaskStatus["completed"] = "Completed";
})(TaskStatus || (TaskStatus = {}));
class TaskManager {
    tasks = [];
    constructor() {
        this.loadFromLocalStorage();
    }
    addTask(task) {
        this.tasks.push(task);
        this.saveToLocalStorage();
    }
    deleteTask(id) {
        this.tasks = this.tasks.filter((task) => task.id !== id);
        this.saveToLocalStorage();
    }
    getTasks() {
        return [...this.tasks];
    }
    saveToLocalStorage() {
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
    }
    loadFromLocalStorage() {
        const tasksData = localStorage.getItem("tasks");
        if (tasksData) {
            const parsedTasks = JSON.parse(tasksData);
            this.tasks = parsedTasks.map((t) => ({
                ...t,
                deadline: new Date(t.deadline),
            }));
        }
    }
}
const manager = new TaskManager();
const modal = document.getElementById("modal");
const renderTasks = () => {
    const tableBody = document.getElementById("taskTableBody");
    tableBody.innerHTML = manager
        .getTasks()
        .map((task) => `
    <tr class="${task.status === TaskStatus.completed ? "task-completed" : ""}">
      <td>${task.id}</td>
      <td><strong>${task.title}</strong></td>
      <td>${task.description}</td>
      <td>
        <span class="status-badge ${task.status === TaskStatus.completed ? "status-done" : "status-pending"}">
          ${task.status}
        </span>
      </td>
      <td>${task.deadline.toLocaleDateString()}</td>
      <td>
        <button onclick="deleteTaskHandler('${task.id}')" class="btn-delete">
          Delete
        </button>
      </td>
    </tr>
  `)
        .join("");
};
window.deleteTaskHandler = (id) => {
    manager.deleteTask(parseInt(id));
    renderTasks();
};
document.getElementById("taskForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const description = document.getElementById("desc")
        .value;
    const status = document.getElementById("status")
        .value;
    const deadline = document.getElementById("deadline")
        .value;
    manager.addTask({
        id: Date.now(),
        title,
        description,
        status,
        deadline: new Date(deadline),
    });
    modal.style.display = "none";
    renderTasks();
    e.target.reset();
});
document.getElementById("openFormBtn")?.addEventListener("click", () => {
    modal.style.display = "flex";
});
document.getElementById("closeFormBtn")?.addEventListener("click", () => {
    modal.style.display = "none";
});
renderTasks();

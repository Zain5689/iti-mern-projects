import { TaskManager } from "./TaskManger.js";
import { TaskStatus } from "./enums/TaskStatus.js";
const manager = new TaskManager();
const homePage = document.getElementById("homePage");
const formPage = document.getElementById("formPage");
const viewTasksBtn = document.getElementById("viewTasksBtn");
const addTaskBtn = document.getElementById("addTaskBtn");
const navigateTo = (page) => {
    if (page === "home") {
        homePage.style.display = "block";
        formPage.style.display = "none";
        viewTasksBtn.classList.add("active");
        addTaskBtn.classList.remove("active");
        renderTasks();
    }
    else {
        homePage.style.display = "none";
        formPage.style.display = "block";
        viewTasksBtn.classList.remove("active");
        addTaskBtn.classList.add("active");
    }
};
const renderTasks = () => {
    const tableBody = document.getElementById("taskTableBody");
    const tasks = manager.getAll();
    tableBody.innerHTML = tasks
        .map((task) => `
            <tr class="${task.status === TaskStatus.completed ? "task-completed" : ""}">
                <td>${task.id.toString().slice(-5)}</td>
                <td><strong>${task.title}</strong></td>
                <td>${task.description}</td>
                <td>
                    <span class="status-badge ${task.status === TaskStatus.completed ? "status-done" : task.status === TaskStatus.InProgress ? "status-in-progress" : "status-pending"}">
                        ${task.status}
                    </span>
                </td>
                <td>${new Date(task.deadline).toLocaleDateString()}</td>
                <td>
                    <button onclick="deleteTaskHandler(${task.id})" class="btn-delete">Delete</button>
                </td>
            </tr>
        `)
        .join("");
};
// handle delete from global scope for simplicity
window.deleteTaskHandler = (id) => {
    manager.delete(id);
    renderTasks();
};
document.getElementById("taskForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    manager.add({
        id: Date.now(),
        title: document.getElementById("title").value,
        description: document.getElementById("desc").value,
        status: document.getElementById("status")
            .value,
        deadline: new Date(document.getElementById("deadline").value),
    });
    e.target.reset();
    // navigateTo("home");
});
viewTasksBtn.addEventListener("click", () => navigateTo("home"));
addTaskBtn.addEventListener("click", () => navigateTo("form"));
navigateTo("home");
//# sourceMappingURL=app.js.map
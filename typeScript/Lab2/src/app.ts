import { TaskManager } from "./TaskManger.js";
import { TaskStatus } from "./enums/TaskStatus.js";

const manager = new TaskManager();

const dashboardPage = document.getElementById("dashboardPage") as HTMLElement;
const formPage = document.getElementById("formPage") as HTMLElement;

const viewTasksBtn = document.getElementById(
  "viewTasksBtn",
) as HTMLButtonElement;
const addTaskBtn = document.getElementById("addTaskBtn") as HTMLButtonElement;

const navigateTo = (page: "dashboard" | "form") => {
  if (page === "dashboard") {
    dashboardPage.style.display = "block";
    formPage.style.display = "none";
    viewTasksBtn.classList.add("active");
    addTaskBtn.classList.remove("active");
    renderTasks();
  } else {
    dashboardPage.style.display = "none";
    formPage.style.display = "block";
    viewTasksBtn.classList.remove("active");
    addTaskBtn.classList.add("active");
  }
};

const renderTasks = () => {
  const tableBody = document.getElementById("taskTableBody")!;
  const tasks = manager.getAll();

  tableBody.innerHTML = tasks
    .map(
      (task) => `
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
        `,
    )
    .join("");
};

(window as any).deleteTaskHandler = (id: number) => {
  manager.delete(id);
  renderTasks();
};

document.getElementById("taskForm")?.addEventListener("submit", (e) => {
  e.preventDefault();

  manager.add({
    id: Date.now(),
    title: (document.getElementById("title") as HTMLInputElement).value,
    description: (document.getElementById("desc") as HTMLTextAreaElement).value,
    status: (document.getElementById("status") as HTMLSelectElement)
      .value as TaskStatus,
    deadline: new Date(
      (document.getElementById("deadline") as HTMLInputElement).value,
    ),
  });

  (e.target as HTMLFormElement).reset();

  navigateTo("dashboard");
});

viewTasksBtn.addEventListener("click", () => navigateTo("dashboard"));
addTaskBtn.addEventListener("click", () => navigateTo("form"));

navigateTo("dashboard");

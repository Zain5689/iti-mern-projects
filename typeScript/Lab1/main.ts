enum TaskStatus {
  pending = "Pending",
  InProgress = "InProgress",
  completed = "Completed",
}

interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  deadline: Date;
}

class TaskManager {
  private tasks: Task[] = [];
  constructor() {
    this.loadFromLocalStorage();
  }

  public addTask(task: Task): void {
    this.tasks.push(task);
    this.saveToLocalStorage();
  }

  public deleteTask(id: number): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.saveToLocalStorage();
  }

  public getTasks(): Task[] {
    return [...this.tasks];
  }

  private saveToLocalStorage(): void {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  private loadFromLocalStorage(): void {
    const tasksData = localStorage.getItem("tasks");
    if (tasksData) {
      const parsedTasks = JSON.parse(tasksData);
      this.tasks = parsedTasks.map((t: any) => ({
        ...t,
        deadline: new Date(t.deadline),
      }));
    }
  }
}

const manager = new TaskManager();
const modal = document.getElementById("modal") as HTMLElement;

const renderTasks = () => {
  const tableBody = document.getElementById("taskTableBody")!;

  tableBody.innerHTML = manager
    .getTasks()
    .map(
      (task) => `
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
  `,
    )
    .join("");
};

(window as any).deleteTaskHandler = (id: string) => {
  manager.deleteTask(parseInt(id));
  renderTasks();
};

document.getElementById("taskForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = (document.getElementById("title") as HTMLInputElement).value;
  const description = (document.getElementById("desc") as HTMLTextAreaElement)
    .value;
  const status = (document.getElementById("status") as HTMLSelectElement)
    .value as TaskStatus;
  const deadline = (document.getElementById("deadline") as HTMLInputElement)
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
  (e.target as HTMLFormElement).reset();
});

document.getElementById("openFormBtn")?.addEventListener("click", () => {
  modal.style.display = "flex";
});

document.getElementById("closeFormBtn")?.addEventListener("click", () => {
  modal.style.display = "none";
});

renderTasks();

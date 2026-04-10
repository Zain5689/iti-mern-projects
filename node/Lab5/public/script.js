const socket = io();
const taskTableBody = document.getElementById("taskTableBody");
const taskForm = document.getElementById("taskForm");
const modal = document.getElementById("modal");
const openFormBtn = document.getElementById("openFormBtn");
const closeFormBtn = document.getElementById("closeFormBtn");
const taskTitleInput = document.getElementById("taskTitle");

socket.emit("tasks:request");

socket.on("tasks:list", (tasks) => {
  taskTableBody.innerHTML = "";
  tasks.forEach(appendTask);
});

function appendTask(task) {
  const tr = document.createElement("tr");
  tr.id = `task-${task._id}`;
  tr.innerHTML = `
        <td><strong>${task.title}</strong></td>
        <td>
            <button onclick="toggleTask('${task._id}')" class="status-badge ${task.done ? "status-completed" : "status-pending"}">
                ${task.done ? "Completed" : "Pending"}
            </button>
        </td>
        <td>
            <button onclick="deleteTask('${task._id}')" style="color:red; border:none; background:none; cursor:pointer;">Delete</button>
        </td>
    `;
  taskTableBody.prepend(tr);
}

taskForm.onsubmit = (e) => {
  e.preventDefault();
  const title = taskTitleInput.value;
  socket.emit("task:create", { title: title });
  taskTitleInput.value = "";
  modal.style.display = "none";
};

socket.on("task:created", (newTask) => {
  appendTask(newTask);
});

socket.on("task:deleted", ({ id }) => {
  const row = document.getElementById(`task-${id}`);
  if (row) row.remove();
});

socket.on("task:updated", (updatedTask) => {
  const row = document.getElementById(`task-${updatedTask._id}`);
  if (row) {
    const badge = row.querySelector(".status-badge");
    badge.className = `status-badge ${updatedTask.done ? "status-completed" : "status-pending"}`;
    badge.innerText = updatedTask.done ? "Completed" : "Pending";
  }
});

function deleteTask(id) {
  socket.emit("task:delete", { id });
}

function toggleTask(id) {
  socket.emit("task:toggle", { id });
}

openFormBtn.onclick = () => {
  modal.style.display = "flex";
};

closeFormBtn.onclick = () => {
  modal.style.display = "none";
};

window.onclick = (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

socket.on("error", (err) => {
  alert(err.message);
});

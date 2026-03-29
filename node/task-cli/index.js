const fs = require("fs");
const path = require("path");

const tasklistPath = path.join(__dirname, "./tasks.json");

function loadTasks() {
  if (fs.existsSync(tasklistPath)) {
    const data = fs.readFileSync(tasklistPath, "utf-8");
    return JSON.parse(data);
  } else {
    return [];
  }
}
function saveTasks(tasks) {
  fs.writeFileSync(tasklistPath, JSON.stringify(tasks, null, 2));
}

function addTask(task) {
  const tasks = loadTasks() || [];
  const newTask = {
    id: tasks.length + 1,
    description: task,
    status: "pending",
  };
  tasks.push(newTask);
  saveTasks(tasks);
  console.log("task added");
}

function listTasks() {
  const tasks = loadTasks() || [];
  if (tasks.length === 0) {
    console.log("no tasks found");
  } else {
    tasks.map((task) => {
      console.log(
        `taskId: ${task.id} , taskDescription: ${task.description}, status: ${task.status}`,
      );
    });
  }
}

function removeTask(id) {
  const tasks = loadTasks() || [];
  const updatedTasks = tasks.filter((task) => task.id !== id);
  saveTasks(updatedTasks);
  console.log("task removed");
}

function markDone(id) {
  const tasks = loadTasks() || [];
  const doneTask = tasks.find((task) => task.id === id);

  if (doneTask) {
    doneTask.status = "done";
    saveTasks(tasks);
    console.log(tasks);
    console.log(doneTask);
    console.log("task marked as done");
  } else {
    console.log("task not found");
  }
}

const command = process.argv[2];
const arg = process.argv[3];

switch (command) {
  case "add":
    addTask(arg);
    break;
  case "list":
    listTasks();
    break;
  case "remove":
    removeTask(parseInt(arg));
    break;
  case "done":
    markDone(parseInt(arg));
    break;
  default:
    console.log(`unknown command: ${command}`);
}

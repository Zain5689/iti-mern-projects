// services/taskService.js
const fileStorage = require("../storage/fileStorage");

async function getTasks() {
  return fileStorage.readTasks();
}

async function addTask(title) {
  if (!title?.trim()) throw new Error("Title is required");
  const tasks = await getTasks();
  const newTask = { id: Date.now(), title: title.trim(), done: false };
  tasks.push(newTask);
  await fileStorage.writeTasks(tasks);
  return newTask;
}

async function deleteTask(id) {
  let tasks = await getTasks();
  const before = tasks.length;
  tasks = tasks.filter((t) => t.id !== id);
  if (tasks.length === before) throw new Error("Task not found");
  await fileStorage.writeTasks(tasks);
}

async function saveTasks(tasks) {
  await fileStorage.writeTasks(tasks);
}

module.exports = { getTasks, addTask, deleteTask, saveTasks };

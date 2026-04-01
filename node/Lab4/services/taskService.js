const fileStorage = require("../storage/fileStorage");

async function getTasks() {
  return fileStorage.readTasks();
}

async function addTask(title) {
  if (!title?.trim()) throw new Error("Title is required");
  const tasks = await getTasks();
  const newTask = {
    id: Date.now(),
    text: title.trim(),
    date: new Date().toLocaleTimeString(),
    done: false,
  };
  tasks.push(newTask);
  await fileStorage.writeTasks(tasks);
  return newTask;
}

async function saveTasks(tasks) {
  await fileStorage.writeTasks(tasks);
}

module.exports = { getTasks, addTask, saveTasks };

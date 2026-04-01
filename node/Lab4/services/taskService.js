const fileStorage = require("../storage/fileStorage");

async function getTasks() {
  return fileStorage.readTasks();
}

async function addTask(text) {
  const tasks = await getTasks();
  const newTask = {
    id: Date.now(),
    text: text.trim(),
    date: new Date().toLocaleTimeString(),
    done: false,
  };
  tasks.unshift(newTask);
  await fileStorage.writeTasks(tasks);
  return newTask;
}

async function deleteTask(id) {
  let tasks = await getTasks();
  const filtered = tasks.filter((t) => String(t.id) !== String(id));
  await fileStorage.writeTasks(filtered);
  return id;
}

module.exports = { getTasks, addTask, deleteTask };

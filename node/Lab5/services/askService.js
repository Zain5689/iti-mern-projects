const mongoose = require("mongoose");
const Task = require("../models/Task");

async function getTasks() {
  return await Task.find().sort({ createdAt: -1 });
}

async function getTaskById(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid task ID");
  }

  const task = await Task.findById(id);
  if (!task) throw new Error(" Task Not found");
  return task;
}

async function addTask(title) {
  if (!title.trim()) throw new Error(" Title is required");
  const task = new Task({ title: title.trim() });
  return await task.save();
}

async function updateTask(id, updates) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid task ID");
  }

  const task = await Task.findByIdAndUpdate(
    id,
    { $set: updates },
    { new: true, runValidators: true },
  );

  if (!task) throw new Error(" Task Not found");
  return task;
}

async function deleteTask(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid task ID");
  }

  const task = await Task.findByIdAndDelete(id);
  if (!task) throw new Error(" Task Not found");
  return task;
}

async function toggleTask(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid task ID");
  }

  const task = await Task.findById(id);
  if (!task) throw new Error(" Task Not found");

  task.done = !task.done;
  return await task.save();
}
module.exports = {
  getTaskById,
  getTasks,
  addTask,
  updateTask,
  deleteTask,
  toggleTask,
};

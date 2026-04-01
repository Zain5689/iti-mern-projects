const express = require("express");
const taskService = require("../services/taskService");

const router = express.Router();

// GET /tasks
router.get("/", async (req, res) => {
  try {
    res.json(await taskService.getTasks());
  } catch {
    res.status(500).json({ error: "Failed to load tasks" });
  }
});

// GET /tasks/:id
router.get("/:id", async (req, res) => {
  try {
    const tasks = await taskService.getTasks();
    const task = tasks.find(t => t.id === Number(req.params.id));
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  } catch {
    res.status(500).json({ error: "Server error" });
  }
});

// POST /tasks
router.post("/", async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) return res.status(400).json({ error: "Title required" });
    const task = await taskService.addTask(title);
    res.status(201).json(task);
  } catch {
    res.status(500).json({ error: "Failed to create task" });
  }
});

// PUT /tasks/:id
router.put("/:id", async (req, res) => {
  try {
    const tasks = await taskService.getTasks();
    const task = tasks.find(t => t.id === Number(req.params.id));
    if (!task) return res.status(404).json({ error: "Task not found" });
    const { title, done } = req.body;
    if (title !== undefined) task.title = title;
    if (done !== undefined) task.done = done;
    await taskService.saveTasks(tasks);
    res.json(task);
  } catch {
    res.status(500).json({ error: "Failed to update task" });
  }
});

// DELETE /tasks/:id
router.delete("/:id", async (req, res) => {
  try {
    await taskService.deleteTask(Number(req.params.id));
    res.json({ deleted: true });
  } catch (err) {
    const status = err.message === "Task not found" ? 404 : 500;
    res.status(status).json({ error: err.message });
  }
});

module.exports = router;

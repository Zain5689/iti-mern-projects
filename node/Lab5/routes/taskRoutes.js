const express = require("express");
const taskService = require("../services/taskService");

const router = express.Router();

// Get / tasks

router.get("/", async (req, res) => {
  try {
    const tasks = await taskService.getTasks();
    res.json(tasks);
  } catch (err) {
    console.error("Error getting tasks:", err);
    res.status(500).json({ error: "Failed to load tasks" });
  }
});

// Get / tasks by Id

router.get("/:id", async (req, res) => {
  try {
    const task = await taskService.getTaskById(req.params.id);
    res.json(task);
  } catch (err) {
    if (err.message === "Task not found" || err.message === "Invalid task ID") {
      res.status(404).json({ error: err.message });
    } else {
      console.error("Error getting task:", err);
      res.status(500).json({ error: "Server error" });
    }
  }
});

// POST

router.post("/", async (req, res) => {
  try {
    const { title } = req.body;
    if (!title || !title.trim()) {
      return res.status(400).json({ error: "Title is required" });
    }
    const task = await taskService.addTask(title);
    res.status(201).json(task);
  } catch (err) {
    console.error("Error getting task:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// PUT
router.put("/:id", async (req, res) => {
  try {
    const { title, done } = req.body;
    const updates = {};

    if (title !== undefined) updates.title = title;
    if (done !== undefined) updates.done = done;

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ error: "No updates provided" });
    }

    const task = await taskService.updateTask(req.params.id, updates);
    res.json(task);
  } catch (err) {
    if (err.message === "Task not found" || err.message === "Invalid task ID") {
      res.status(404).json({ error: err.message });
    } else {
      console.error("Error updating task:", err);
      res.status(500).json({ error: "Failed to update task" });
    }
  }
});

// PATCH
router.patch("/:id/toggle", async (req, res) => {
  try {
    const task = await taskService.toggleTask(req.params.id);
    res.json(task);
  } catch (err) {
    if (err.message === "Task not found" || err.message === "Invalid task ID") {
      res.status(404).json({ error: err.message });
    } else {
      console.error("Error toggling task:", err);
      res.status(500).json({ error: "Failed to toggle task" });
    }
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const task = await taskService.deleteTask(req.params.id);
    res.json({ deleted: true });
  } catch {
    if (err.message === "Task not found" || err.message === "Invalid task ID") {
      res.status(404).json({ error: err.message });
    } else {
      console.error("Error getting task:", err);
      res.status(500).json({ error: "Server error" });
    }
  }
});

module.exports = router;

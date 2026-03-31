const express = require("express");
const taskService = require("./services/taskService");

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await taskService.getTasks();
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Failed to load tasks" });
  }
});

// GET /tasks/:id
app.get("/tasks/:id", async (req, res) => {
  try {
    const tasks = await taskService.getTasks();
    const task = tasks.find((t) => t.id === Number(req.params.id));
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  } catch {
    res.status(500).json({ error: "Server error" });
  }
});

// POST /tasks
app.post("/tasks", async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) return res.status(400).json({ error: "Title required" });
    const task = await taskService.addTasks(title);
    res.status(201).json(task);
  } catch {
    res.status(500).json({ error: "Failed to create task" });
  }
});

// DELETE /tasks/:id
app.delete("/tasks/:id", async (req, res) => {
  try {
    await taskService.deleteTask(Number(req.params.id));
    res.json({ deleted: true });
  } catch (err) {
    const status = err.message === "Task not found" ? 404 : 500;
    res.status(status).json({ error: err.message });
  }
});

app.use((req, res) => res.status(404).json({ error: "Route not found" }));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

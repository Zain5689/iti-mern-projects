const taskService = require("../services/taskService");

module.exports = function registerTaskSocket(io) {
  io.on("connection", (socket) => {
    socket.on("tasks:request", async () => {
      try {
        const tasks = await taskService.getTasks();
        socket.emit("tasks:list", tasks);
      } catch (err) {
        console.error("Error loading tasks:", err);
        socket.emit("error", { message: "Failed to load tasks" });
      }
    });

    socket.on("task:create", async ({ title }) => {
      try {
        if (!title.trim()) {
          return socket.emit("error", {
            message: "Title is required",
          });
        }
        const newTask = await taskService.addTask(title);
        io.emit("task:created", newTask);
      } catch (err) {
        console.error("Error loading tasks:", err);
        socket.emit("error", { message: "Failed to load tasks" });
      }
    });

    socket.on("task:delete", async ({ id }) => {
      try {
        await taskService.deleteTask(id);
        io.emit("task:deleted", { id });
      } catch (err) {
        console.error("Error deleting task:", err);
        const msg =
          err.message === "Task not found" || err.message === "Invalid task ID"
            ? "Task not found"
            : "Failed to delete task";
        socket.emit("error", { message: msg });
      }
    });

    socket.on("task:toggle", async ({ id }) => {
      try {
        const task = await taskService.toggleTask(id);
        io.emit("task:updated", task);
      } catch (err) {
        console.error("Error toggling task:", err);
        const msg =
          err.message === "Task not found" || err.message === "Invalid task ID"
            ? "Task not found"
            : "Failed to update task";
        socket.emit("error", { message: msg });
      }
    });

    socket.on("disconnect", (reason) => {
      console.log(`Client disconnected: ${socket.id} — ${reason}`);
    });
  });
};

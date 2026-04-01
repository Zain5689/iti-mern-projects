const taskService = require("../services/taskService");

module.exports = function registerTaskSocket(io) {
  io.on("connection", (socket) => {
    socket.on("task:request", async () => {
      try {
        const tasks = await taskService.getTasks();
        socket.emit("note:all", tasks);
      } catch (err) {
        socket.emit("error", { message: "Failed to load notes" });
      }
    });

    socket.on("note:create", async (data) => {
      try {
        if (data.text?.trim()) {
          const newTask = await taskService.addTask(data.text);
          io.emit("note:new", newTask);
        }
      } catch (err) {
        socket.emit("error", { message: "Failed to create note" });
      }
    });

    socket.on("note:delete", async (id) => {
      try {
        await taskService.deleteTask(id);
        io.emit("note:deleted", id);
      } catch (err) {
        socket.emit("error", { message: "Failed to delete" });
      }
    });
  });
};

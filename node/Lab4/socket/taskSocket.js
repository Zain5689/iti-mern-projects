const taskService = require("../services/taskService");

module.exports = function registerTaskSocket(io) {
  io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);

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
        const newTask = await taskService.addTask(data.text);
        io.emit("note:new", newTask);
      } catch (err) {
        socket.emit("error", { message: "Failed to create note" });
      }
    });
  });
};

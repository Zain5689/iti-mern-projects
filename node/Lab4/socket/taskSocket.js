const taskService = require("../services/taskService");

module.exports = function registerTaskSocket(io) {
  io.on("connection", (socket) => {
    console.log(`client connected:${socket.id}`);

    // Client requests current task list on connect
    socket.on("task:request", async () => {
      try {
        const tasks = await taskService.getTasks();
        socket.emit("tasks:list", tasks);
      } catch (err) {
        socket.emit("error", { message: "failed to load tasks" });
      }
    });

    //client creates a task
    socket.on("task:request", async () => {
      try {
        const tasks = await taskService.getTasks();
        socket.emit("tasks:list", tasks);
      } catch (err) {
        socket.emit("error", { message: "failed to load tasks" });
      }
    });
  });
};

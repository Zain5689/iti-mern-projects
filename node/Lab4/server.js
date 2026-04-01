const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: { originL: "*" },
});

//Middleware
app.use(express.json());
app.use(express.static("app"));

//Routes
app.use("/tasks", taskRoutes);

//socket.IO
require("./socket/taskSocket")(io);

//404
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

const PORT = 3000;
httpServer.listen(PORT, () => {
  console.log("Server ready on http://localhost:${PORT}");
});

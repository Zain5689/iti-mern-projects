const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
const httpServer = http.createServer(app); // wrap app in http.Server
const io = new Server(httpServer, {
  cors: { origin: "*" }, // allow browser connections during development
});

// Middleware
app.use(express.json()); // Tell server how to handle JSON body
app.use(express.static("app")); // serve the browser client

// Routes
app.use("/tasks", taskRoutes);

// Socket.IO handlers
require("./socket/taskSocket")(io);

// 404 catch-all
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

const PORT = 3000;
httpServer.listen(PORT, () =>
  console.log(`Server ready on http://localhost:${PORT}`),
);

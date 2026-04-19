require("dotenv").config();
const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const { Server } = require("socket.io");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: { origin: "*" },
});

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/FacultySystemDB";

async function connectToMongoDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
}

connectToMongoDB();

app.use(express.json());
app.use(express.static("public"));

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    dbState:
      mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  });
});

// Routes
app.use("/tasks", taskRoutes);

// Socket.IO handlers
require("./socket/taskSocket")(io);

// 404 catch-all
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server ready on http://localhost:${PORT}`);
});

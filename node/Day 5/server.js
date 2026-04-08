require("dotenv").config();
const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const { Server } = require("socket.io");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
const httpServer = http.createServer(app); // wrap app in http.Server
const io = new Server(httpServer, {
  cors: { origin: "*" } // allow browser connections during development
});

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/taskboard";

// MongoDB connection with better error handling
async function connectToMongoDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    console.log("\n📋 To run this application, you need:");
    console.log("1. Install MongoDB locally: https://www.mongodb.com/try/download/community");
    console.log("2. Or use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas");
    console.log("3. Or update MONGODB_URI in .env file with your connection string");
    console.log("\nFor local MongoDB, run: brew install mongodb-community (on macOS)");
    console.log("Then start MongoDB: brew services start mongodb-community");
    process.exit(1);
  }
}

connectToMongoDB();

// Middleware
app.use(express.json()); // Tell server how to handle JSON body
app.use(express.static("public")); // serve the browser client

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
  console.log(`🚀 Server ready on http://localhost:${PORT}`);
});

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: { origin: "*" },
});

app.use(express.json());
app.use(express.static("app"));

app.use("/tasks", taskRoutes);

require("./socket/taskSocket")(io);

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

const PORT = 3000;
httpServer.listen(PORT, () => {
  console.log(`Server ready on http://localhost:${PORT}`);
});

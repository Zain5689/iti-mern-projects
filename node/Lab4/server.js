const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: { origin: "*" },
});

app.use(express.json());
app.use(express.static("app"));

require("./socket/taskSocket")(io);

const PORT = 3000;
httpServer.listen(PORT, () => {
  console.log(`Server ready on http://localhost:${PORT}`);
});

const http = require("http");
const fs = require("fs");
const path = require("path");

const FILE_PATH = path.join(__dirname, "./tasks.json");

const readTasks = () => {
  try {
    const data = fs.readFileSync(FILE_PATH, "utf-8");
    return JSON.parse(data || "[]");
  } catch (err) {
    return [];
  }
};

const saveTasks = (tasks) => {
  fs.writeFileSync(FILE_PATH, JSON.stringify(tasks, null, 2));
};

const sendResponse = (res, statusCode, data) => {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
};

const server = http.createServer((req, res) => {
  const { method, url } = req;

  if (method === "GET" && url === "/tasks") {
    const tasks = readTasks();
    return sendResponse(res, 200, tasks);
  }

  if (method === "POST" && url === "/tasks") {
    let body = "";
    req.on("data", (chunk) => (body += chunk.toString()));
    req.on("end", () => {
      try {
        const payload = JSON.parse(body);
        if (!payload.title) {
          return sendResponse(res, 400, { error: "Title is required" });
        }

        const tasks = readTasks();
        const newTask = {
          id: Date.now(),
          title: payload.title,
          done: false,
        };

        tasks.push(newTask);
        saveTasks(tasks);
        sendResponse(res, 201, newTask);
      } catch (err) {
        sendResponse(res, 400, { error: "Invalid JSON format" });
      }
    });
    return;
  }

  if (method === "DELETE" && url.startsWith("/tasks/")) {
    const idSegment = url.split("/").filter(Boolean).pop();
    const id = Number(idSegment);

    if (isNaN(id)) {
      return sendResponse(res, 400, { error: "Invalid ID format" });
    }

    const tasks = readTasks();
    const taskIndex = tasks.findIndex((t) => Number(t.id) === id);

    if (taskIndex === -1) {
      return sendResponse(res, 404, { error: "Task not found" });
    }

    tasks.splice(taskIndex, 1);
    saveTasks(tasks);
    return sendResponse(res, 200, { message: "Task deleted successfully" });
  }

  sendResponse(res, 404, { error: " not found" });
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000/");
});

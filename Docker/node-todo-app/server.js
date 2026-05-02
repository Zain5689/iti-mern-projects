const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to my Node.js Todo App!");
});

app.get("/todos", (req, res) => {
  res.send("Here you will see all your todos.");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

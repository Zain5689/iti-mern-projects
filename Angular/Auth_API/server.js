const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const users = [];
const SECRET_KEY = "my_super_secret_key";

app.post("/register", async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const newUser = {
    id: Date.now(),
    email: req.body.email,
    password: hashedPassword,
  };
  users.push(newUser);
  res.status(201).send({ message: "User Registered!" });
});

app.post("/login", async (req, res) => {
  const user = users.find((u) => u.email === req.body.email);
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return res.status(401).send({ message: "Invalid email or password" });
  }

  const token = jwt.sign({ userId: user.id, email: user.email }, SECRET_KEY, {
    expiresIn: "1h",
  });

  res.send({ token });
});

app.get("/users", (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).send("Access Denied");

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(403).send("Invalid Token");
    res.json(users.map((u) => ({ email: u.email })));
  });
});

app.listen(3000, () =>
  console.log("Auth API running on http://localhost:3000"),
);

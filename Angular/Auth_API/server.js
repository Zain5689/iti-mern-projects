const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const users = [];
const SECRET_KEY = "my_super_secret_key";

const categories = [
  { _id: "69f576fb9145e8747fc55260", title: "Electronics" },
  { _id: "69f58fcb7d81a76a2f32ddcd", title: "Clothes" },
];

app.post("/api/auth/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = {
      id: Date.now(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    };
    users.push(newUser);
    res.status(201).send({ message: "User Registered!" });
  } catch (error) {
    res.status(500).send({ message: "Error registering user" });
  }
});

app.post("/api/auth/login", async (req, res) => {
  const user = users.find((u) => u.email === req.body.email);

  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return res.status(401).send({ message: "Invalid email or password" });
  }

  const token = jwt.sign(
    { userId: user.id, email: user.email, name: user.name },
    SECRET_KEY,
    {
      expiresIn: "1h",
    },
  );

  res.send({ token });
});

//get all user
app.get("/api/users", (req, res) => {
  res.send(users);
});

app.listen(3000, () =>
  console.log("Auth API running on http://localhost:3000"),
);

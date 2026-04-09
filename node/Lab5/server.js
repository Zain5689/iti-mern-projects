const express = require("express");
const PORT = process.env.PORT || 3000;
const app = express();

app.get("/", (req, res) => {
  res.send("hello from NodeJs server");
});

app.listen(PORT, () => {
  console.log("successfully connection on port 3000 ");
});

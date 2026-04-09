const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT;
const app = express();

app.get("/", (req, res) => {
  res.send("hello from NodeJs server");
});

// test the connect to mongodb
async function connectToMongoDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    console.log("\n📋 To run this application, you need:");
    console.log(
      "1. Install MongoDB locally: https://www.mongodb.com/try/download/community",
    );
    console.log(
      "2. Or use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas",
    );
    console.log(
      "3. Or update MONGODB_URI in .env file with your connection string",
    );
    console.log(
      "\nFor local MongoDB, run: brew install mongodb-community (on macOS)",
    );
    console.log("Then start MongoDB: brew services start mongodb-community");
    process.exit(1);
  }
}

connectToMongoDB();

app.listen(PORT, () => {
  console.log("successfully connection on port 3000 ");
});

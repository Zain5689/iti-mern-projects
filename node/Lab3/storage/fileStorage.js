const fs = require("fs").promises;
const path = require("path");

const datadir = path.join(__dirname, "../data");
const filePath = path.join(datadir, "tasks.json");

// Ensure data directory + file exist
async function ensureFile() {
  try {
    await fs.mkdir(datadir, { recursive: true });
    await fs.access(filePath);
  } catch (err) {
    if (err.code === "ENOENT") {
      await fs.writeFile(filePath, "[]", "utf-8");
    } else {
      throw err;
    }
  }
}

// Read tasks from JSON file
async function readTasks() {
  await ensureFile();

  try {
    const data = await fs.readFile(filePath, "utf-8");
    if (!data.trim()) return [];
    return JSON.parse(data);
  } catch (err) {
    console.log("error reading tasks", err.message);
    // Fallback to empty array if corrupted JSON
    return;
  }
}

// Write tasks to JSON file (atomic write)
async function writeTasks(tasks) {
  await ensureFile();
  const tempFilePath = filePath + ".tmp";
  try {
    // Write to temp file first
    await fs.writeFile(tempFilePath, JSON.stringify(tasks, null, 2), "utf-8");
    // Rename temp file → actual file (atomic operation)
    await fs.rename(tempFilePath, filePath);
  } catch (err) {
    console.error("Error writing tasks:", err.message);
    throw err;
  }
}

module.exports = {
  readTasks,
  writeTasks,
};

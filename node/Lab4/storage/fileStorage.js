const fs = require("fs").promises;
const path = require("path");

const datadir = path.join(__dirname, "../data");
const filePath = path.join(datadir, "tasks.json");

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

async function readTasks() {
  await ensureFile();
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return data.trim() ? JSON.parse(data) : [];
  } catch (err) {
    return [];
  }
}

async function writeTasks(tasks) {
  await ensureFile();
  const tempFilePath = filePath + ".tmp";
  try {
    await fs.writeFile(tempFilePath, JSON.stringify(tasks, null, 2), "utf-8");
    await fs.rename(tempFilePath, filePath);
  } catch (err) {
    throw err;
  }
}

module.exports = { readTasks, writeTasks };

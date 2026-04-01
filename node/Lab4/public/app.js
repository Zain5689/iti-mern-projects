const socket = io("http://localhost:3000");
const noteInput = document.getElementById("noteInput");
const notesContainer = document.getElementById("notesContainer");
const statusDot = document.getElementById("status");

socket.on("connect", () => {
  statusDot.classList.add("online");
  socket.emit("task:request");
});

socket.on("disconnect", () => {
  statusDot.classList.remove("online");
});

socket.on("note:all", (notes) => {
  notesContainer.innerHTML = notes.map((n) => renderNote(n)).join("");
});

socket.on("note:new", (note) => {
  notesContainer.insertAdjacentHTML("afterbegin", renderNote(note));
});

socket.on("note:deleted", (id) => {
  const card = document.querySelector(`[data-id="${id}"]`);
  if (card) {
    card.style.opacity = "0";
    card.style.transform = "scale(0.9)";
    setTimeout(() => card.remove(), 300);
  }
});

document.getElementById("addBtn").onclick = () => {
  const text = noteInput.value.trim();
  if (text) {
    socket.emit("note:create", { text });
    noteInput.value = "";
  }
};

function deleteNote(id) {
  console.log("Deleting task with ID:", id);
  socket.emit("note:delete", id);
}

function renderNote(note) {
  const content = note.text || note.title || "Empty Note";
  return `
    <div class="note-card" data-id="${note.id}">
        <button class="delete-btn" onclick="deleteNote('${note.id}')">&times;</button>
        <p>${escapeHtml(content)}</p>
        <small>${note.date || "Task"}</small>
    </div>
  `;
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

window.deleteNote = deleteNote;

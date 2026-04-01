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
  notesContainer.innerHTML = notes
    .filter((n) => n && n.text)
    .map((n) => renderNote(n))
    .join("");
});

socket.on("note:new", (note) => {
  if (note && note.text) {
    notesContainer.insertAdjacentHTML("afterbegin", renderNote(note));
  }
});

document.getElementById("addBtn").onclick = () => {
  const text = noteInput.value.trim();
  if (text) {
    socket.emit("note:create", { text });
    noteInput.value = "";
  }
};

function renderNote(note) {
  return `
    <div class="note-card">
        <p>${escapeHtml(note.text)}</p>
        <small style="color: #b2bec3; font-size: 0.7rem;">${note.date || ""}</small>
    </div>
  `;
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

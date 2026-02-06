var ringtone = document.getElementById("ringtone");
var contact = document.getElementsByClassName("contact")[0];

contact.addEventListener("mouseenter", function () {
  ringtone.play();
  ringtone.controls = true;
});

contact.addEventListener("mouseleave", function () {
  ringtone.pause();
  ringtone.currentTime = 0;
  ringtone.controls = false;
});

// contact-chip
const contactTrigger = document.getElementById("contactTrigger");
const msgBox = document.getElementById("msgBox");
const info = document.getElementById("info");
const closeBtn = document.getElementById("closeBtn");
const avatar = document.getElementById("avatar");

contactTrigger.addEventListener("click", (e) => {
  e.stopPropagation();
  msgBox.classList.toggle("show");
});

closeBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  info.classList.add("collapsed");
  msgBox.classList.remove("show");
});

avatar.addEventListener("click", (e) => {
  if (info.classList.contains("collapsed")) {
    e.stopPropagation();
    info.classList.remove("collapsed");
  }
});

document.addEventListener("click", () => {
  msgBox.classList.remove("show");
});

// var ringtone = document.getElementById("ringtone");
// var contact = document.getElementsByClassName("contact")[0];

// contact.addEventListener("mouseenter", function () {
//   ringtone.play();
//   ringtone.controls = true;
// });

// contact.addEventListener("mouseleave", function () {
//   ringtone.pause();
//   ringtone.currentTime = 0;
//   ringtone.controls = false;
// });

// contact-chip
var closeBtn = document.getElementsByClassName("close-btn")[0];
var content = document.getElementById("info");
var avatar = document.getElementById("avatar");

closeBtn.addEventListener("click", (e) => {
  content.classList.add("collapsed");
});

avatar.addEventListener("click", () => {
  content.classList.toggle("collapsed");
});

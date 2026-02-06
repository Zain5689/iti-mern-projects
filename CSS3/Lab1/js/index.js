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

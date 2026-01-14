//  slider
var images = ["assets/1.jpg", "assets/2.jpg", "assets/3.jpg"];
var index = 0;
var id;

function nextImg(img) {
  index++;
  if (index >= images.length) {
    index = 0;
  }
  img.src = images[index];
}

function prevImage(img) {
  index--;
  if (index < 0) {
    index = images.length - 1;
  }
  img.src = images[index];
}
function stopImage() {
  clearInterval(id);
  id = null;
}
function silder(e) {
  if (e.type == "mouseenter" && !id) {
    id = setInterval(function () {
      nextImg(e.target);
    }, 500);
  }
}

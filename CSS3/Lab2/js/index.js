const organs = document.querySelectorAll(".organ");
const tooltip = document.getElementById("tooltip");

organs.forEach((organ) => {
  organ.addEventListener("mouseover", (e) => {
    const name = organ.dataset.name;
    tooltip.textContent = name;
    tooltip.style.left = e.pageX + "px";
    tooltip.style.top = e.pageY + "px";
    tooltip.style.opacity = 1;
  });

  organ.addEventListener("mouseout", () => {
    tooltip.style.opacity = 0;
  });
});

// canvas

const canvas = document.getElementById("faceCanvas");
const ctx = canvas.getContext("2d");

const sadImg = document.getElementById("sad");
const smileImg = document.getElementById("smile");

function drawImage(img, scale = 1) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const width = 200 * scale;
  const height = 200 * scale;

  const x = (canvas.width - width) / 2;
  const y = (canvas.height - height) / 2;

  ctx.drawImage(img, x, y, width, height);
}

window.onload = () => {
  drawImage(sadImg);
};

canvas.addEventListener("mousedown", () => {
  drawImage(smileImg, 1.2);
});

canvas.addEventListener("mouseup", () => {
  drawImage(sadImg, 1);
});

// draw in canvas

const drawCanvas = document.getElementById("drawCanvas_1");
console.log(drawCanvas);

const ct = drawCanvas.getContext("2d");

let isDrawing = false;
let isErasing = false;

drawCanvas.addEventListener("contextmenu", (e) => e.preventDefault());

drawCanvas.addEventListener("mousedown", (e) => {
  if (e.button === 0) {
    isDrawing = true;
    isErasing = false;
  } else if (e.button === 2) {
    isDrawing = false;
    isErasing = true;
  }

  ct.beginPath();
  ct.moveTo(e.offsetX, e.offsetY);
});

drawCanvas.addEventListener("mousemove", (e) => {
  if (!isDrawing && !isErasing) return;

  if (isDrawing) {
    ct.globalCompositeOperation = "source-over";
    ct.strokeStyle = "black";
    ct.lineWidth = 4;
  }

  if (isErasing) {
    ct.globalCompositeOperation = "destination-out";
    ct.lineWidth = 20;
  }

  ct.lineTo(e.offsetX, e.offsetY);
  ct.stroke();
});

drawCanvas.addEventListener("mouseup", () => {
  isDrawing = false;
  isErasing = false;
  ct.closePath();
});

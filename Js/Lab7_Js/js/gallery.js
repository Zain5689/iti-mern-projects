// gallery
function gallery(e) {
  if (e.type === "mouseenter") {
    e.target.style.opacity = "0.3";
  } else if (e.type === "mouseout") {
    e.target.style.opacity = "1";
  }
}

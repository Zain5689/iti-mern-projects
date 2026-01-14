const stars = document.getElementById("stars");

stars.addEventListener("mouseover", function (e) {
  if (e.target.classList.contains("fa-star")) {
    e.target.style.color = "gold";
  }
});

stars.addEventListener("mouseout", function (e) {
  if (e.target.classList.contains("fa-star")) {
    if (!e.target.classList.contains("active")) {
      e.target.style.color = "black";
    }
  }
});

stars.addEventListener("click", function (e) {
  if (e.target.classList.contains("fa-star")) {
    e.target.classList.toggle("active");
    e.target.style.color = e.target.classList.contains("active")
      ? "gold"
      : "black";
  }
});
//  ِAnimation search form
function animationSearch(e) {
  if (e.type === "focus") {
    e.target.style.width = "100%";
  } else if (e.type === "blur") {
    e.target.style.width = "130px";
  }
}

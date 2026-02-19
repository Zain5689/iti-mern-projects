$(document).ready(function () {
  const colors = ["blue", "green", "orange", "yellow"];

  $("body").on(
    {
      mouseenter: function () {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        $(this).css("background-color", randomColor);
      },
      mouseleave: function () {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        $(this).css("background-color", randomColor);
      },
      click: function () {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        $("<div></div>").addClass(randomColor).insertAfter($(this));
      },
    },
    "div",
  );
});

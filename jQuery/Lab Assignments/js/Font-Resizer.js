var min = 10;
var max = 50;
var current = 20;

$("#increase").on("click", function () {
  if (current < max) {
    current += 10;
    $(".content").css("font-size", current + "px");
    $(".error").text("");
  } else {
    $(".error").text("Maximum font size reached!");
  }
});
$("#decrease").on("click", function () {
  if (current > min) {
    current -= 10;
    $(".content").css("font-size", current + "px");
    $(".error").text("");
  } else {
    $(".error").text("Minimum font size reached!");
  }
});

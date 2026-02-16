$(".container1 div").each(function () {
  const divClass = $(this).attr("class");
  $(this).css("background-color", divClass);

  $(this)
    .find("p")
    .each(function () {
      const pClass = $(this).attr("class");
      $(this).css("color", pClass);
    });
});

// ******************************

$(".container2 [href*='google']").each(function () {
  this.text = "Google";
});
$(".container2 [href*='org']").each(function () {
  this.text = "IEEE";
});
$(".container2 [href*='https']").each(function () {
  this.text = "Facebook";
});
$(".container2 [href^='http']").each(function () {
  this.append("(Official Website)");
});

// ******************************

$(".container3 figure:nth-child(3)").each(function () {
  $(this).children("img").attr("src", "img/orange.png");
  $(this).children("figcaption").text("Fig.1 - Orange Juice");
});

// ******************************

$("td.my-name").attr("style", "color: blue");
$("td:odd").attr("style", "background: pink");

$(".container4 tr:last-child td:nth-child(2)").css("font-weight", "bold");

// ******************************

$(".container5 ul li:nth-child(2)").css("font-style", "italic");
$(".container5 ol li:nth-child(2)").next().css("color", "red");

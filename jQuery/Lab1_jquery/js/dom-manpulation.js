$(".container1").append('<div class="black">black div</div>');
$(".container1").prepend('<div class="white">white div</div>');
$(".container1 .blue  p.pink").before("<p class='yellow'>yellow p</p>");

// ******************************

$(".container2 p").each(function () {
  let text = $(this).text();
  $(this).replaceWith(`<a href="http://${text}">${text}</a>`);
});

// ******************************

$(".container3 img").wrap("<figure></figure>");
$(".container3 figure img").after("<figcaption>Coffee</figcaption>");

// ******************************

$(".container4 td.col-age").empty();
$(".container4 td:contains('Mohsen')").addClass("man");
$(".container4 td").toggleClass("your-email", function () {
  return !$(this).hasClass("your-email");
});

// ******************************

var filtered = $(".container5  li").filter(function (index) {
  return index % 3 === 0;
});
filtered.css("color", "red");

// ******************************

$(".container6 input[name='username']").val("Zainab");
$("#my-form input[type='checkbox']").prop("checked", true);

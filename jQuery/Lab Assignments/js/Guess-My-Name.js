const myName = "zainab";
let count = 0;
let display = Array(myName.length).fill("_");

$("#my-name").on("keyup", function () {
  let inputValue = $(this).val();
  count++;
  $(".counter").text(count);

  for (let i = 0; i < inputValue.length; i++) {
    if (inputValue[i] === myName[i]) {
      display[i] = myName[i];
    }
  }

  $("h3.my-name").text(display.join(""));

  if (display.join("") === myName) {
    $(".result").text("Correct! You guessed it!").css("color", "green");
    $(this).prop("disabled", true);
  } else {
    $(".result").text("Keep guessing...").css("color", "red");
  }
});

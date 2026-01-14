window.alert("Welcome to my site!");
const userName = window.prompt("Please enter your name:");
document.getElementById("user").innerText = `welcome , ${userName}!`;

// sum
function sum(a, b) {
  return a + b;
}

var x = Number(window.prompt("Enter first number:"));
var y = Number(window.prompt("Enter second number:"));
var result = sum(x, y);

console.log("The sum is: " + result);

// temperatures;
function temperatures(temp) {
  console.log(temp >= 30 ? "HOT" : "Cold");
}
temperatures("30");

// temperature
function temperature(temp, feel) {
  if (temp > 30 && feel > 30) {
    console.log("Hot");
  } else if (temp < 25 && feel < 25) {
    console.log("Cold");
  } else if (temp >= 25 && temp <= 30 && feel >= 25 && feel <= 30) {
    console.log("normal ");
  } else {
    console.log("Ambiguous");
  }
}
temperature(32, 33); // Hot
temperature(20, 22); // Cold
temperature(27, 28); // normal
temperature(28, 35); // Ambiguous

//Can you use ternary conditional operator in previous example : No because there are multiple conditions to check and multiple outcomes to handle, which makes it impractical to use a ternary operator.

// Can you use switch case in previous example : No because switch statements are best suited for discrete values, not ranges or complex conditions like those in the temperature function.

//students
function students(faculty) {
  switch (faculty) {
    case "FCI":
      console.log("You’re eligible to Programing tracks");
      break;
    case "Engineering":
      console.log("You’re eligible to Network and Embedded tracks");
      break;
    case "Commerce":
      console.log("You’re eligible to ERP and Social media tracks");
      break;
    default:
      console.log("You’re eligible to SW fundamentals track");
  }
}
students("FCI");

// switch is better because It is designed to compare one value with several values.

// odd
function odd(first, last) {
  debugger;
  for (var i = first; i <= last; i++) {
    if (i % 2 !== 0) {
      console.log(i);
    }
  }
}
odd(1, 20);

// Bonus Question
document.write('<div id="headings-container">');
document.write("<h2>Main Headings Section</h2>");
for (let i = 1; i <= 6; i++) {
  document.write(`<h${i}>This is Header Number H${i}</h${i}>`);
}
document.write("</div>");

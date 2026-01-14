// 1
const tips = [
  "Always use === instead of == to avoid unexpected type conversion.",
  "Use var and const instead of var.",
  "JavaScript is case-sensitive.",
  "Use arrow functions for cleaner syntax.",
  "Always validate user input.",
  "Use console.log() to debug your code.",
  "Avoid global variables whenever possible.",
  "Use template literals for easier string concatenation.",
  "Learn array methods like map(), filter(), and reduce().",
  "Always comment complex code for better readability.",
];

var randomTip = Math.floor(Math.random() * tips.length);
var tip = (document.getElementById("tip").innerHTML = tips[randomTip]);

// 2
function DisplayDate() {
  const now = new Date();
  const localDateTime = now.toLocaleString();
  document.getElementById("date").innerHTML = localDateTime;
}
DisplayDate();

// 3

function checkEmail() {
  var email = prompt("Enter your email");
  const regex = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]+\b/;
  if (regex.test(email)) {
    alert("Valid Email");
  } else {
    alert("Invalid Email");
  }
}

checkEmail();

// 4
var grades = [60, 100, 10, 15, 85];
grades.sort(function (a, b) {
  return b - a;
});
var highestGrade = grades[0];
console.log(grades);
console.log(highestGrade);

// 5

var students = [
  { Name: "zainab", Degree: 85 },
  { Name: "Sara", Degree: 85 },
  { Name: "Mona", Degree: 78 },
];
// add element
students.push({ Name: "Ali", Degree: 70 });
console.log(students);

for (const key in students) {
  console.log(
    `Student ${parseInt(key) + 1}: Name = ${students[key].Name}, Degree = ${
      students[key].Degree
    }`
  );
}

// delete element
students.pop();
for (const element of students) {
  console.log(element);
}

// 6

function showUserDate() {
  const dateRegex = /^\d{2}-\d{2}-\d{4}$/;
  var userInput;
  var valid = false;
  do {
    userInput = prompt("Enter your birth date (DD-MM-YYYY) e.g. 22-01-1999");
    if (dateRegex.test(userInput)) {
      var day = Number(userInput.substring(0, 2));
      var month = Number(userInput.substring(3, 5));
      var year = Number(userInput.substring(6, 10));
      var dateObj = new Date(year, month - 1, day);
      alert("Your date: " + dateObj.toDateString());
      valid = true;
    } else {
      alert("Wrong Date Format! Please try again.");
    }
  } while (!valid);
}

// 1.	Make a Map and use the key as the day name (Saturday, Sunday,…..), and the values is a Tip of each day, and on page load make a function that loops on gets the day name of the current day, and loops on the generator to (use: for … of) to get the tip of the current day (for example: on Saturday displays the Saturday’s tip, and so on), and alert it.
var tipsMap = new Map();
tipsMap.set("Saturday", "Remember to take a break and relax.");
tipsMap.set("Sunday", "Start your week with a positive mindset.");
tipsMap.set("Monday", "Focus on your goals for the week.");
tipsMap.set("Tuesday", "Stay organized and prioritize tasks.");
tipsMap.set("Wednesday", "Take a mid-week break to recharge.");
tipsMap.set("Thursday", "Push through any challenges with determination.");
tipsMap.set(
  "Friday",
  "Celebrate your accomplishments and prepare for the weekend.",
);

function getTips() {
  var today = new Date().toLocaleDateString("en-US", { weekday: "long" });
  for (const [day, tip] of tipsMap) {
    if (day === today) {
      alert(tip);
      break;
    }
  }
}

getTips();

// 2.	Search for other new ESS6, 7, 8 features that weren’t explained in the lecture.

// 1 Exponentiation Operator (**) — ES7
// The OLD way
const oldResult = Math.pow(2, 3); // 8

// The NEW way (ES7)
const newResult = 2 ** 3; // 8

// 2 Object Shorthand Properties — ES6
const username = "Coder123";
const status = "Active";

// The OLD way
const userOld = {
  username: username,
  status: status,
};

// The NEW way (Shorthand)
const userNew = {
  username,
  status,
};
console.log(userNew);

// 3 Trailing Commas in Function Params — ES8
function exampleFunction(param1, param2, param3) {
  console.log(param1, param2, param3);
}

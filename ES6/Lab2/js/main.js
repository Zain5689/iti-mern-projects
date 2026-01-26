var startCookButton = document.getElementById("startCook");
var statusDiv = document.getElementById("status");

startCookButton.addEventListener("click", startCook);

let riceDone = false;
let vegDone = false;

function startCook() {
  statusDiv.innerHTML = "Cooking started! <br><br> Preparing ingredients...";

  // Scene 3: Rice (Async)
  setTimeout(() => {
    console.log("Rice cooked");
    riceDone = true;
    checkDish();
  }, 3000);

  // Scene 4: Vegetables (Async)
  setTimeout(() => {
    console.log("Vegetables cooked");
    vegDone = true;
    checkDish();
  }, 5000);
}

// Scene 8: Callback
function checkDish() {
  if (riceDone && vegDone) {
    console.log("Dish is ready!");
    makeSauce();
  }
}

// Scene 9: Callback Hell
function makeSauce() {
  console.log("Sauce is ready!");
}

// Scene 9: Callback Hell using promise
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
function makeSauce() {
  console.log("Starting to cooking...");
  wait(1000)
    .then(() => {
      console.log("Rice cooked");
      return wait(1000);
    })
    .then(() => {
      console.log("Vegetables cooked");
      return wait(1000);
    })
    .then(() => {
      console.log("Sauce is Ready");
      return wait(1000);
    })
    .then(() => {
      console.log("Dish  ready to serve! ");
    })
    .catch((error) => {
      console.error("Something went wrong in the kitchen!", error);
    });
}
console.log("======================================");
makeSauce();
console.log("======================================");

// Task1
function dim(e) {
  if (e.type === "focus") {
    e.target.style.border = "1px solid blue";
  } else if (e.type === "blur") {
    e.target.style.border = "1px solid #ccc";
  }
}
// HTML5 validation will prevent the form from being submitted if the fields are not valid.
// This is because attributes like "required", "type", "minlength", and "pattern" are built-in checks
// that the browser enforces automatically before submission.

// However, custom validation using JavaScript (like checking name format or matching passwords)
// will not prevent the form from being submitted by default. These functions only run when triggered
// "event.preventDefault()" in a submit event handler.

var form = document.getElementById("regForm");
var fullname = document.getElementById("fullname");
var password = document.getElementById("password");
var confirm_password = document.getElementById("confirm_password");
var message = document.getElementById("message");
var submitError = document.getElementById("submitError");

// Full Name validation
function validation(input) {
  const errorMsg = input.nextElementSibling;

  if (input.value == "" || input.value.length < 4) {
    errorMsg.textContent = "Invalid name";
    input.style.border = "2px solid red";
    input.style.backgroundColor = "lightgray";
    return false;
  } else {
    errorMsg.textContent = "";
    input.style.border = "2px solid green";
    input.style.backgroundColor = "white";
    return true;
  }
}

// Password match validation
function validatePassword() {
  if (password.value === confirm_password.value && password.value.length >= 6) {
    message.textContent = "Passwords match!";
    message.style.color = "green";
    password.style.border = "2px solid green";
    confirm_password.style.border = "2px solid green";
    password.style.backgroundColor = "white";
    confirm_password.style.backgroundColor = "white";
    return true;
  } else {
    message.textContent = "Passwords do not match!";
    message.style.color = "red";
    password.style.border = "2px solid red";
    confirm_password.style.border = "2px solid red";
    password.style.backgroundColor = "lightgray";
    confirm_password.style.backgroundColor = "lightgray";
    return false;
  }
}

// Real-time password validation
password.addEventListener("keyup", validatePassword);
confirm_password.addEventListener("keyup", validatePassword);

// Handle form submit
form.addEventListener("submit", function (e) {
  submitError.textContent = ""; // reset error

  var isNameValid = validation(fullname);
  var isPasswordValid = validatePassword();

  if (!isNameValid) {
    e.preventDefault(); // stop form
    submitError.textContent = "Invalid Name";
  } else if (!isPasswordValid) {
    e.preventDefault(); // stop form
    submitError.textContent = "Passwords do not match";
  } else {
    alert("Form submitted successfully!");
  }
});

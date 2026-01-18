document.forms[0].onsubmit = function (e) {
  e.preventDefault();
  //0. get values:
  var emailTxt = e.target.elements["email"];
  var cardNumberTxt = document.getElementById("card");
  var remember = document.getElementById("remember");

  console.log(remember);
  //   console.log(cardNumberTxt);

  //1. validate value in text boxes
  var validEmail = ValidateEmail(emailTxt.value);
  var validCardNumber = validateCardNumber(cardNumberTxt.value);

  //2. if valid => Index (something to check login)
  if (validEmail && validCardNumber) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://127.0.0.1:5500/advancedJs/Lab1/js/data.json");
    xhr.onload = function () {
      if (xhr.status == 200) {
        var data = JSON.parse(xhr.responseText);
        //b. loop over data to check existance of email
        var found = false;
        for (user of data) {
          if (
            user.Email == emailTxt.value &&
            user.cardNumber == cardNumberTxt.value
          ) {
            found = true;
            break;
          }
        }

        if (!found) {
          //e.preventDefault();
          document.getElementById("errormessage").innerText =
            "Wrong Email or cardNumber";
        } else {
          if (remember.checked) {
            var date = new Date();
            date.setDate(date.getDate() + 1);
            document.cookie = `user=${emailTxt.value};expires= ${date.toUTCString()}`;
            location.assign("http://127.0.0.1:5500/advancedJs/Lab1/index.html");
          } else {
            sessionStorage.setItem("user", `${emailTxt.value}`);
            location.assign("http://127.0.0.1:5500/advancedJs/Lab1/index.html");
          }
        }
      }
    };

    xhr.send();
  }

  //3. if not valid stop submitting => show error messages
  else {
    //e.preventDefault();
    document.getElementById("errormessage").innerText =
      "Wrong Email or cardNumber";
  }
};

function ValidateEmail(email) {
  var emailRegex = new RegExp(/^[a-zA-Z]+[a-zA-Z\.\_0-9]*(\@gmail\.com)$/);
  return emailRegex.test(email);
}

function validateCardNumber(cardNumber) {
  var cardRegex = new RegExp(/^LIB-[0-9]{4}$/);
  return cardRegex.test(cardNumber);
}

window.onload = function () {
  var emailInput = document.getElementById("email");
  var cookies = document.cookie.split("; ");
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i].split("=");
    if (cookie[0] === "user") {
      emailInput.value = cookie[1];
    }
  }
};

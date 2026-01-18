// function checkUser() {
//   var cookies = document.cookie;
//   cookies = cookies.replace("; ", "&");
//   var params = new URLSearchParams(cookies);
//   console.log(params.get("user"));

//   if (params.get("user") == null) {
//     location.assign("http://127.0.0.1:5500/Login.html");
//   }
// }
// checkUser();

var allBooks = [];
var category = document.getElementById("category");

function getData() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "http://127.0.0.1:5500/advancedJs/Lab1/js/books.json");
  xhr.onload = function () {
    if (xhr.status == 200) {
      allBooks = JSON.parse(xhr.responseText);
      displayData(allBooks);
    }
  };
  xhr.send();
}
getData();

function displayData(books) {
  var pTable = document.querySelector("#BookTable>tbody");
  for (item of books) {
    var tr = document.createElement("tr");
    tr.innerHTML = `
                    <td>${item.id}</td>
                    <td>${item.title}</td>
                    <td>${item.author}</td>
                    <td>${item.category}</td>
                    <td>
                    <input type='button' style="padding: 6px 12px;
                    background-color: #3498db;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;" id="reserve-${item.id}" value='Reserve' onclick='Reserve("${item.id}")'/>
                    </td>
                `;
    pTable.appendChild(tr);
  }
}

// var reserveBtn = document.getElementById("Reserve");
// console.log(reserveBtn);
function disableButton(bookId) {
  var btn = document.getElementById(`reserve-${bookId}`);
  if (btn) {
    btn.disabled = true;
    btn.value = "Reserved";
    btn.style.backgroundColor = "#95a5a6";
    btn.style.cursor = "not-allowed";
  }
}
function Reserve(bookId) {
  var cart = JSON.parse(localStorage.getItem("Cart")) || [];

  var index = -1;
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].Book == bookId) {
      index = i;
      break;
    }
  }

  if (index === -1) {
    cart.push({ Book: bookId, Quantity: 1 });
    localStorage.setItem("Cart", JSON.stringify(cart));
    disableButton(bookId);
  } else {
    disableButton(bookId);
  }
}

// filter Function
// console.log(category.value);
function filterBooks() {
  var selectedCategory = category.value;
  var pTable = document.querySelector("#BookTable>tbody");
  pTable.innerHTML = "";
  if (selectedCategory === "all") {
    displayData(allBooks);
  } else {
    var filteredBooks = allBooks.filter(function (book) {
      console.log(book.category);
      console.log(selectedCategory);
      return book.category === selectedCategory;
    });
    displayData(filteredBooks);
  }
}

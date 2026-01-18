var deleteAll = document.getElementById("deleteAll");
var reservationNumber = document.getElementById("number");
// console.log(reservationNumber);
var cart = JSON.parse(localStorage.getItem("Cart")) || [];
// console.log(cart.length);
reservationNumber.innerHTML = `reservationNumber  : ${cart.length}`;

getCart();
function getCart() {
  // var cart = JSON.parse(localStorage.getItem("Cart")) || [];
  for (item of cart) {
    var bookId = item.Book;
    var quantity = item.Quantity;
    getItemData(bookId, quantity);
  }
}

function getItemData(bookId, quantity) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "http://127.0.0.1:5500/advancedJs/Lab1/js/books.json");
  xhr.onload = function () {
    if (xhr.status == 200) {
      var books = JSON.parse(xhr.responseText);

      // console.log("datat", books);

      const data = books.find((b) => b.id === Number(bookId));

      displayData(data, quantity);
    }
  };
  xhr.send();
}

function displayData(book, quantity) {
  var pTable = document.querySelector("#BooksTable>tbody");
  var tr = document.createElement("tr");
  tr.innerHTML = `
    <td>${book.id}</td>
    <td>${book.title}</td>
      <td>
      <input
      type="button"
      value="Remove"
      style="padding: 6px 12px;
        background-color: red;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;"
      onclick='Delete("${book.id}", this)'
/>
      </td>
   
  `;
  pTable.appendChild(tr);
}

function Delete(bookId, btn) {
  console.log(btn);

  // var cart = JSON.parse(localStorage.getItem("Cart")) || [];

  // find index
  var index = cart.findIndex((item) => item.Book === bookId);

  if (index !== -1) {
    cart.splice(index, 1);

    // remove row from table
    btn.closest("tr").remove();

    // update localStorage
    localStorage.setItem("Cart", JSON.stringify(cart));
  }
}

deleteAll.addEventListener("click", function () {
  var sure = confirm("Are you sure you want to delete all items?");

  if (sure) {
    localStorage.removeItem("Cart");

    // clear table
    document.querySelector("#BooksTable tbody").innerHTML = "";
  }
});

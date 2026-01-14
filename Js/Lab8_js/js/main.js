// 1-	Use AJAX to retrieve users data, and display: First Name, Last name and address and phone from the following test web API: https://jsonplaceholder.typicode.com/users

var data;

const apiUrl = "https://dummyjson.com/users";
var http = new XMLHttpRequest();
http.open("GET", apiUrl);
http.send();
http.addEventListener("readystatechange", function () {
  if (http.readyState == 4 && http.status == 200) {
    data = JSON.parse(http.response);
    //     console.log(data);
    displayData(data);
  }
});

// function display data
function displayData(data) {
  var users = data.users;
  var inner = "";
  for (const user of users) {
    inner += `
      <div class="card">
        <h2>ID: ${user.id}</h2>
        <h2>Name: ${user.firstName}</h2>
        <p>Username: ${user.lastName}</p>
         <p>Address: ${user.address}</p>
        <p>Phone: ${user.phone}</p>
       
      </div>
    `;
  }

  document.querySelector(".box").innerHTML = inner;
}

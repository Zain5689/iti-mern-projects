// a.  Make a textbox where the user can enter user ID, and press display and then display the user with the given ID.

const apiUrl = "https://dummyjson.com/users";
var request = new XMLHttpRequest();

const userIdInput = document.querySelector("#id");
const displayUserButton = document.querySelector("#btn");

displayUserButton.addEventListener("click", () => {
  const userId = userIdInput.value;
  request.open("GET", apiUrl + "/" + userId);
  request.send();

  request.onload = () => {
    if (request.status === 200) {
      const user = JSON.parse(request.response);

      const userCard = document.createElement("div");
      userCard.classList.add("user-card");
      userCard.innerHTML = `
        <div class="user-card-header">
          <h2>${user.firstName} ${user.lastName}</h2>
          <p>${user.company.name}</p>
        </div>
        <div class="user-card-body">
          <p>${user.email}</p>
          <p>${user.address.address}</p>
          <p>${user.phone}</p>
        </div>`;

      document.body.appendChild(userCard);
    } else {
      // Handle error
      console.log("Error:", request.status, request.statusText);
    }
  };
});

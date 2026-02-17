$("#add").on("click", function () {
  var nameValue = $("#name").val();
  var ageValue = $("#age").val();
  if (nameValue && ageValue) {
    const data = `
        <tr>
          <td>${nameValue}</td>
          <td>${ageValue}</td>
          <td><button class="deleteBtn">Delete</button></td>
        </tr>
  `;
    $("#persons-list tbody").append(data);
    $("#name").val("");
    $("#age").val("");
  } else {
    alert("Please enter both Name and Age!");
  }
});

$("#persons-list").on("click", ".deleteBtn", function () {
  $(this).closest("tr").remove();
});

$("#search").click(function () {
  var searchItem = $("#search-item").val().toLowerCase();

  $("#persons-list tbody tr").each(function () {
    var rowText = $(this).text().toLowerCase();

    if (rowText.indexOf(searchItem) > -1) {
      $(this).show();
    } else {
      $(this).hide();
    }
  });
  $("#search-item").val("");
});

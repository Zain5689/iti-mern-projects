/************** 1 **************/
function showTime() {
  var now = new Date();
  var time = now.toLocaleTimeString();
  document.getElementById("time").innerHTML = time;
}

setInterval(showTime, 1000);
showTime();
/**************2 **************/

var params = new URLSearchParams(window.location.search);
var username = params.get("user");
var welcomeDiv = document.getElementById("welcome");

if (welcomeDiv && username) {
  welcomeDiv.innerHTML = "<h1>Welcome " + username + "</h1>";
}
/************** 3 **************/

var newWin;
function openWin() {
  setTimeout(function () {
    if (!newWin || newWin.closed) {
      newWin = window.open("", "adWindow", "width=600,height=400");
    }

    if (newWin) {
      newWin.document.write(`
                        
                  <h1>title</h1>
                  <p>Lorem ipsum dolor sit amet consectetuadipisicing elit. Error numquam rerum officia fugquasi minima laboriosam sequi consequuntuvoluptatum iure maxime dolores possimusexercitationem eveniet necessitatibus commodi quiaad odit.</p>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error numquam rerum officia fuga quasi minima laboriosam sequi consequuntur voluptatum iure maxime dolores possimus, exercitationem eveniet necessitatibus commodi quia, ad odit.</p>
                  <p>Lorem ipsum dolor sit amet consectetuadipisicing elit. Error numquam rerum officia fugquasi minima laboriosam sequi consequuntuvoluptatum iure maxime dolores possimusexercitationem eveniet necessitatibus commodi quia, ad odit.</p>
                  <p>Lorem ipsum dolor sit amet consectetuadipisicing elit. Error numquam rerum officia fugquasi minima laboriosam sequi consequuntuvoluptatum iure maxime dolores possimusexercitationem eveniet necessitatibus commodi quiaad odit.</p>
                        
      `);
      newWin.document.close();
    }
  }, 3000);
}

function closeWin() {
  if (newWin && !newWin.closed) {
    newWin.close();
  } else {
    window.close();
  }
}

/************** 4 **************/
function openTerms() {
  window.open("terms.html");
}

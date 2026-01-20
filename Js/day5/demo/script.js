// url
var http = new XMLHttpRequest();
http.open("GET", "https://dummyjson.com/posts");
http.send();
http.addEventListener("readystatechange", function () {
  console.log(http.readyState);

  if (http.readyState == 4 && http.status == 200) {
    console.log("success");
    var data = JSON.parse(http.response);
    localStorage.setItem("data", http.response);
    console.log(data.posts);

    displayData(data);

    // console.log(http.response);
    console.log(typeof http.response);
  }
});

// var url = new XMLHttpRequest();
// url.open("GET", "link");
// url.send();
// url.addEventListener("readyStateChange", function () {
//   if (url.readyState === 4 && url.status === 200) {
//     var data = JSON.parse(url.response);
//       console.log( data );

//   }
// });
/**
 * status code
 * 200 success
 *
 * 404 Not found
 *
 * 500 server error
 *
 *
 */
/**
 * HTTP METHODS
 * GET
 * POST
 * PUT
 * PATCH
 * DELETE
 *PUT
 * {
 * USERi=1
 * NAME:AHMED
 * AGE:23
 * }
 */
// http.open("PUT","https://dummyjson.com/posts")

/* readyState
0=>init
1=>open =>configuration
2=>send
3=>processing
4=>complete return data
*/

/**
 * backend
 * file=>functions
 * addEmp( emobjp){
 * error log x
 * add in database
 * }
 * getEmps(){
 * }
 * url=>http:domain name/functions/addEmp
 * data=>emp
 *
 * frontend
 * httprequest
 * calling fun=>http:domain name/functions/addEmp
 *
 */
function displayData(data) {
  var posts = data.posts;
  var inner = "";
  for (const post of posts) {
    inner += `<div class="card">
    <h2>id: ${post.id}</h2>
<h2>title: ${post.title}</h2>
<p>description: ${post.body}</p>
</div>`;
  }

  document.querySelector(".box").innerHTML = inner;
}

// 	Create image node
// parent of image = imageContainer
const nodeLists = document.getElementById("image");
const parentDi = nodeLists.parentNode;
const image1 = document.createElement("img");
image1.setAttribute("src", "assets/1.jpg");

// let Image2 = document.createElement("img");
// Image2.setAttribute("src", "assets/2.jpg");

/*
 * what’s the difference between insertBefore and appendChild
 * insertBefore require two param newchild and child
 */

let text = document.getElementById("text");

// nodeLists.appendChild(image1);
// parentDi.insertBefore(text, image1); error
parentDi.insertBefore(image1, text);

/* imageContainer

  *why childNumber is 6 because calc p in two ans breakLine
   and image 
*/

var imageContainer = document.getElementById("imageContainer");
var childNumber = imageContainer.childNodes.length;
console.log("count", childNumber);

// alert count in window
alert(childNumber);

//Remove the added image
// var removedImage = imageContainer.removeChild(image1);
// console.log(removedImage);

/**
 *
 * bom
 *
 * dom=>document object model
 *
 * dom js or part js
 * getElementById
 */

// var ph=document.getElementById("para")
// ph.innerHTML="hello world"

// var paras = document.getElementsByTagName("p");
// // console.log(paras[0]);
// // console.log(paras[1]);
// var c = 0;
// for (var element of paras) {
//   c++;
//   element.innerHTML = "order " + c;
// }

// var eles=document.getElementsByClassName("test")
//  var c=0
// for (var element of eles) {
//     c++
//     element.innerHTML="order "+c
// }

//querySelector ,querySelectorAll(".class")(#id)

// var eles=document.querySelectorAll(".test")
//  var c=0
// for (var element of eles) {
//     c++
//     element.innerHTML="order "+c
// }
// var ele=document.querySelector(".test")
// console.log(ele);
/***
 *
 * var img={
 * id:test,
 * className:value,
 *
 * }
 */

// var img=document.querySelector("img")

// img.id="anything"
// img.src="images/1.jpg"
// img.className="bg"
// img.setAttribute("class","bg")
// console.log(img.getAttribute("class"));

// img.className="active"
// img.classList.add("active")
// img.classList.remove("bg")

// img.classList.toggle("active")
// img.classList.toggle("active")

//style

// function dim(e){
//     console.log(e.target.style.width);

//     if(e.type=="mouseenter"){
// e.target.style.width="200px"
// e.target.style.height="200px"
// e.target.style.border="3px solid"
// e.target.style.backgroundColor="red"

//     }
//     else if(e.type=="mouseout"){
// e.target.style.width="100px"
// e.target.style.height="100px"
// e.target.style.border="1px solid"
// e.target.style.backgroundColor="transparent"

//     }
// }
// console.log(this);
// var images=['1.jpg','2.jpg','3.jpg','4.jpg']
// var index=0;
// function nextImg(img){
//     index++;
//     if(index>=images.length){
//         index=0
//     }
// img.src=`images/${images[index]}`
// }
//  var id;
// function silder(e) {

//     if(e.type=="mouseenter"){
//          id=setInterval(function(){
// nextImg(e.target)
//         },1000)
//     }else  if(e.type=="mouseout"){
//         clearInterval(id)
//     }
// }

//obj=>user
var users = [
  {
    fullname: "aya",
    address: "minya",
    age: 26,
  },
  {
    fullname: "nada",
    address: "bs",
    age: 20,
  },
];
// var data=` <tr>
//         <td>${user.fullname}</td>
//         <td>${user.age}</td>
//         <td>${user.address}</td>
//     </tr>`
// var table=document.querySelector('table')
//     // table.innerHTML+=data
//     for (const user of users) {
//  var tr=document.createElement("tr")
// var td1=document.createElement('td')
// td1.textContent=user.fullname
// var td2=document.createElement('td')
// td2.textContent=user.age
// var td3=document.createElement('td')
// td3.textContent=user.address
// tr.append(td1,td2,td3)
// table.appendChild(tr)
//     }
//htmlCollection,nodeList
var eles = document.getElementsByClassName("box"); //4
console.log(eles.length); //3
for (var i = 0; i < eles.length; i++) {
  document.body.removeChild(eles[i]);
}
console.log(eles);

//3
//1
// document.body.appendChild(document.createElement("div")).className="box"
// console.log(eles.length);
// var eles=document.querySelectorAll(".box") //3
// console.log(eles.length); //3
// document.body.appendChild(document.createElement("div")).className="box"
// console.log(eles.length);

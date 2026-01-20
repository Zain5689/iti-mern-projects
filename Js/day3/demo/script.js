/**
 * bom=>browser obj model
 *
 *   window
 *   screen
 *   history
 *   document
 *   location
 *
 *
 * prop
 * method
 */

//window

//innerWidth outerWidth

// console.log(`innerWidth ${window.innerWidth} outWidth ${outerWidth}`);
// console.log(`innerHeight ${window.innerHeight} outHeight ${outerHeight}`);

// if(window.innerWidth<786){
//     console.log("Mobile view");

// }
// else{
//     console.log("Desktop view");

// }
// console.log(`screen x ${window.screenX} screen y ${window.screenY}`);
// console.log(`scroll X ${window.scrollX} scroll Y ${window.scrollY}`);

//open(url,target,prop)

//  var newWin
// function opeNewWin() {
//      if(!newWin)
//        newWin=open("about.html","_blank","width=200 ,height=300px ,screenX=100 ,screenY=200")
// }

// function closeWin(){
//     if(newWin&&!newWin.closed)
//       newWin.close()
// }
// //window.document.get...
// //newWin
// function writeInNewWin(){
//     if(newWin&&!newWin.closed){
// newWin.document.getElementById("about").innerHTML="new window"
// newWin.focus()
//     }
// }

//x,y
//100=>scrollTo (50)=>50
// function scroll_To() {
//     scrollTo(0,100)
// }

// //scrollBy()
// //100=>scrollBy (50)=>150
// function scroll_By() {
//     scrollBy(0,100)
// }

//setInterval ,clearIntervel

for (var i = 0; i < 10; i++) {
  console.log("message");
}

// function test(para){
// para()
// }

// test(function(){
//     console.log("hello");

// })
//setInterval(function,millSecond)
var id;
// console.log(id);

// function startInterval(){

//  id=setInterval(function(){
//     console.log("welcome");

// },1000)
// }
// function stopIntervel(){
//     clearInterval(id)
// }

//clearInterval(id)

// var progress=document.getElementById("progress")
// var interval=setInterval(function(){
// progress.value++;
// if(progress.value==progress.max)
//     clearInterval(interval)
// console.log(progress.value);

// },1000)

//setTimeOut(function,2000) ,clearTimeout
var time;
function startTimeOut() {
  time = setTimeout(function () {
    alert("welcome");
  }, 2000);
}
function stopTimeOut() {
  clearTimeout(time);
}

//screen

// console.log(`screen avil width ${screen.availWidth} screen avil hight ${screen.availHeight}`);
// function opeNewWin() {

//availWidth=>300
//w=>50
//300-50=250/2=125
//     var w=200;
//     var left=(screen.availWidth-w)/2

//       var newWin=open("about.html","_blank",`width=${w} ,height=300px ,screenX=${left} ,screenY=200`)
// }

//location
// console.log(location.href);
// console.log(location.search);
// console.log(location.hash);

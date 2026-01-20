// getElementById
// innerHtml

/*
datatypes

===========primitive datatype
* number
* string
* boolean
* null
* undefined

===========non primitive datatype
*object
*function

*/

//var  x; declaration

//var x=5 declaration and initialization

/*
 * to learn the type of  ==========  typeof x
 * camel case =>first letter in first word small and the test of word capital ex firstName
 * js is dynamic typing
 *
 */

/**
 * implicity conversion
 * /-<></>*==
 * "5"*5=>5*5
 *
 *
 * explicity conversion
 * +
 * "5"+5
 * prompt to enter value from user
 */

// var y = null;
// console.log(typeof y);

// var n = "aya";
// var res = Number(n);
// console.log(typeof NaN);

/*
=========== Condition ==============

* if , switch
 * x=5
 * = a sign
 * x==5
 * == compare value
 * === compare value and datatype
*/

// var x = 10;
// if (x === 10) {
//   console.log("equal"); //print equal
// }

// if (null === undefined) {
//   console.log("equal");  //Not print equal
// }

// switch(role){
//     case "admin":
//         console.log("admin page");
//         break;
//     case "hr":
//         console.log("hr page");
//         break;
//     case "user":
//         console.log("user page");
//         break;
//     default:
//         console.log("not auth");
//         break;
// }

// for (var i = 1; i <= 10; i++) {
//   if (i % 2 == 1) {
//     console.log("this num " + i + " is odd");
//   }
// }

//while
//var i=1 init
// while(condition i<=10){
//i++ increment
//}

//do while
// var i=11;
// do{
// console.log("hello world");
// i++;
// }while(i<=10)

/*

***********************Function***********************
function fName () {
log("yes")
}

 * call =>  fName();
 * parameterless
 * parametrized
 * function totalGrads(math,prog){}
 * 
*/

// Hosting
// sum(10, 12);  //error
// var sum = function (x, y) {
//   console.log(x + y);
// };
// sum(10, 5);
// console.log(typeof sum);

/* Scope

 * global scope
 * Local scope
 * 
*/

// function test() {
//   var ab = 10; //local scope
// }

// console.log(ab);
// builtin objects(array,string,math,date)
// js high level lang

// var emp1 = {
//   name: "zainab",
//   age: 20,
//   manger: { name: "mohamed", age: 40 },
// };
// console.log(emp1.name);
// console.log(emp1.age);
// console.log(emp1.manger.name);
// console.log(emp1.manger.age);

// var car = {
//   color: "white",
//   move: function () {
//     console.log("moving");
//   },
//   stop: function () {
//     console.log("stop");
//   },
// };
// car.move();

/* Object
 * hasOwnProperty
 * car.hasOwnProperty("color")
 */

// var x = 10;
// var y = x;

// y = 30;
// console.log(x, y);

// var obj1 = { name: "ali", age: 25 };
// var obj2 = obj1;
// obj2.age = 30;
// console.log(obj1.age, obj2.age);

// var x = 10;
// console.log(window.x);

// var emp1 = { name: "ahmed" };
// var emp2 = emp1;
// if (emp1 == emp2) {
//   console.log("equal");
// } else {
//   console.log("no equal");
// }

// var obj = { name: "ali", age: 20 };

// for (const key in obj) {
//   // console.log(key);  //  key => i
//   // console.log(obj[key]);
//   console.log(`key ${key} value ${obj[key]}`);
// }

var colors = ["red", "yellow", "green", "black", "brown"];
// for (var item of colors) {
//   console.log(item);
// }

// colors.unshift("pink");
// console.log(colors);
// colors.shift();
// console.log(colors);

// var newArr = colors.slice(1, 3);
// var newArr = colors.slice(1);
// console.log(newArr);

// colors.splice(1, 2);
// console.log(colors);

// colors.splice(1, 0, "pink");
// console.log(colors);

// console.log(colors.sort());
// console.log(colors.reverse());
// console.log(colors.join("  "));

// console.log(colors.includes("pink"));

// var name = "ayaabc mahmoud";

// console.log(typeof name);

// console.log(name.indexOf("a"));
// console.log(name.lastIndexOf("a"));
// console.log(name.includes("abc"));
// console.log(name.startsWith("aya"));
// console.log(name.endsWith("oud"));

//Math
// console.log(Math.round(3.6)); // to closest Int Num
// console.log(Math.ceil(3.2)); // to largest Int Num
// console.log(Math.floor(3.9)); // to lowest  Int Num
// console.log(Math.random()); //Random value from 0-1

// var date = new Date();
var date = new Date();
// console.log(date);

// console.log(date.getFullYear());
// console.log(date.getMonth() + 1);
// console.log(date.getDay());
// console.log(date.getDate());

// console.log(date.toLocaleString());
// console.log(date.toLocaleDateString());
// console.log(date.toLocaleTimeString());

// var name = "ayaabc mahmoud";
// for (var i = 0; i < name.length; i++) {
//       console.log( name[i] );

// }

// var date1 = new Date(2024, 4, 28);
// var date2 = new Date(2024, 4, 24);
// console.log(date1);

// if (date1 == date2) {
//   console.log("equal");
// } else {
//   console.log("not equal");
// }
// var d = date1 - date2;
// console.log(d);

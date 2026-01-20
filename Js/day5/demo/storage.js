/***
 * cookie
 * 4k
 * server
 * expiredDate
 * 5 m
 * localstorage
 * sessionstorage
 */
var expDate = new Date("2026-01-30");
var expDate1 = new Date("2025-01-30");
var username = "aya";
document.cookie = `username=${username};expires=${expDate.toUTCString()}`;
document.cookie = `pass=aya@123;expires=${expDate.toUTCString()}`;
document.cookie = `username=;expires=${expDate1.toUTCString()}`;
var data = document.cookie.split(";");
// var user = data[1].split("=");
// var user = data[1].split("=");
// var user = data[1].split("=");
// console.log(user[1]);

//localstorage

// localStorage.setItem("username","ahmed")
// localStorage.setItem("pass","123")
// console.log(localStorage.getItem("username"));
// localStorage.removeItem("pass")
// localStorage.clear()
// var data=[
//     {
//         name:"nada",
//         address:"minya"
//     },
//       {
//         name:"aya",
//         address:"bs"
//     }
// ]

// localStorage.setItem("data",JSON.stringify(data))

// sessionStorage.setItem("username","nada")

/**
 * sessionStorage
 * cookies
 * localstorage
 */

// console.log(x);

// test()
// var lat, long;

// function getLocation() {
//   navigator.geolocation.getCurrentPosition((x) => {
//     var lat = x.coords.latitude;
//     var long = x.coords.longitude;
//     console.log(lat, long);

//   });
// }

// function goToMap() {
//   location.assign("https://www.google.com/maps?q=" + lat + "+" + long);
// }

// function getLocation() {
//   return new Promise((res, rej) => {
//     navigator.geolocation.getCurrentPosition((x) => {
//       var data = {
//         lat: x.coords.latitude,
//         long: x.coords.longitude,
//       };
//       res(data);
//     });
//   });
// }


// async function goToMap() {
//   var data = await getLocation()
//   location.assign("https://www.google.com/maps?q=" + data.lat + "+" + data.long);
// }

// console.log("test1");
// goToMap()
// console.log("test2");




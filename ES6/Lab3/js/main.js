var addCourse = document.getElementById("addCourse");
var Instructor = document.getElementById("Instructor");
const courseName = document.getElementById("courseName");
import { createObservable } from "./Observable.js";
import { getData } from "./storage.js";

const course$ = createObservable();

course$.subscribe((msg) => console.log("Observer 1:", msg));

//  Create a button 'Add Course' (Event).
// addCourse.addEventListener("click", (e) => {
//   e.preventDefault();

//   // 1. Synchronous Validation (Call Stack)
//   if (courseName.value === "") {
//     course$.emit("Validation failed: Name is required");
//     return;
//   }
//   course$.emit("Validating inputs...");

//   // 2. Start Async Operation (Event Queue)
//   setTimeout(() => {
//     course$.emit("Course saved!");

//     // 3. Callback Hell (Async inside Async)
//     setTimeout(() => {
//       course$.emit("Fetching instructors...");

//       setTimeout(() => {
//         course$.emit("Instructor assigned: Ali");
//         setTimeout(() => {
//           course$.emit("Course started!");
//         }, 1000);
//       }, 1000);
//     }, 1000);
//   }, 1000);
// });

// Refactor Callback Hell using Promises, then using Async/Await.
// Scene 9: Callback Hell using promise
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

addCourse.addEventListener("click", (e) => {
  e.preventDefault();

  if (courseName.value === "") {
    console.log("Validation failed: Name is required");
    return;
  }
  console.log("Validating inputs...");

  wait(1000)
    .then(() => {
      console.log("Course saved!");
      return wait(1000);
    })
    .then(() => {
      console.log("Fetching instructors...");
      return wait(1000);
    })
    .then(() => {
      console.log("Instructor assigned: Ali");
      return wait(1000);
    })
    .then(() => {
      console.log("Course started!");
    })
    .catch((err) => {
      console.error("Error path:", err);
    });
});

//  Use Fetch to get instructors from: https://jsonplaceholder.typicode.com/users and randomly assign one

Instructor.addEventListener("click", getData);

// // bubble sort
// // [4, 3, 7, 1, 2, 5]  // len = 6
// function bubbleSort(arr) {
//   let arrLength = arr.length;
//   for (let i = 0; i < arrLength - 1; i++) {
//     for (let j = 0; j < arrLength - i - 1; j++) {
//       if (arr[j] > arr[j + 1]) {
//         [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
//       }
//     }
//   }
//   return arr;
// }

// document.getElementById("bubbleResult").innerHTML =
//   `<br>Sorted array: ${bubbleSort([4, 3, 7, 1, 2, 5]).join(" , ")}`;

// // Quick sort
// function quickSort(arr) {
//   if (arr.length <= 1) {
//     return arr;
//   }
//   const pivot = arr[arr.length - 1];
//   const left = [];
//   const right = [];

//   for (let i = 0; i < arr.length - 1; i++) {
//     if (arr[i] < pivot) {
//       left.push(arr[i]);
//     } else {
//       right.push(arr[i]);
//     }
//   }
//   return [...quickSort(left), pivot, ...quickSort(right)];
// }

// document.getElementById("quickResult").innerHTML =
//   `<br>Sorted array: ${quickSort([4, 3, 7, 1, 2, 5]).join(" , ")}`;

// // linear search
// document.getElementById("btn").addEventListener("click", function () {
//   const arr = [4, 3, 7, 1, 2, 5];
//   const num = parseInt(document.getElementById("searchInput").value);
//   let found = false;
//   for (let i = 0; i < arr.length; i++) {
//     if (arr[i] === num) {
//       found = true;
//       break;
//     }
//   }
//   if (found) {
//     document.getElementById("searchResult").innerHTML +=
//       `<br>Number ${num} found in the array.`;
//   } else {
//     document.getElementById("searchResult").innerHTML +=
//       `<br>Number ${num} not found in the array.`;
//   }
// });

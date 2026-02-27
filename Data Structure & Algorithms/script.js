// algorithm
// bubble sort
// [4, 3, 7, 1, 2, 5]  // len = 6

function bubbleSort(arr) {
  let length = arr.length;
  for (let i = 0; i < length - 1; i++) {
    for (let j = 0; j < length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}

console.log(bubbleSort([4, 3, 7, 1, 2, 5]));

function linearSearch(arr, value) {
  let length = arr.length;
  for (let i = 0; i < length; i++) {
    if (arr[i] === value) {
      console.log("found");
      break;
    } else {
      console.log("not founded");
      return;
    }
  }
  return;
}
console.log(linearSearch([4, 3, 7, 1, 2, 5], 10));

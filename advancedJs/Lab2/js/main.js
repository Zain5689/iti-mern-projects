// 1.	Alert the sum of 2 numbers, and pass the sum as an argument to alert function (slef-invoking function).

(function () {
  var a = 10;
  var b = 20;
  var sum = a + b;
  alert("Sum is: " + sum);
})();

// 2.	Try arrow function:
// a.	With Array.filter() function, to return the odd numbers from an array.
var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var oddNumbers = numbers.filter((num) => num % 2 !== 0);
console.log("Odd Numbers:", oddNumbers);

// b.	With array.forech() to print the even values.
var evenNumbers = [];
numbers.forEach((num) => {
  if (num % 2 === 0) {
    evenNumbers.push(num);
  }
});
console.log("Even Numbers:", evenNumbers);

// c.	With array.map() to print the square of each element.
var squares = numbers.map((num) => num * num);
console.log("Squares:", squares);

// d.	“An arrow function does not create its own this context, unlike the normal literal function.” – Explain with demo.

// An Arrow Function does not create its own this.
// Instead, it inherits this from its surrounding (lexical) scope.

// A Normal Function, on the other hand, has its own this, which depends on how the function is called.

// 3.	Try spread operator with any array of your implementation.
var arr1 = [1, 2, 3];
var arr2 = [4, 5, 6];
var combinedArr = [...arr1, ...arr2];
console.log("Combined Array:", combinedArr);

// 4.	Create a student literal object that contains: name, University, faculty, and final grade. print student data in the console using template literals in this format:
// {Std_name} is a student in faculty of {fac_name} in university {Uni_name}
// And his final grad is {grad}.

var student = {
  name: "John Doe",
  university: "XYZ University",
  faculty: "Computer Science",
  finalGrade: "A",
};
console.log(
  `${student.name} is a student in faculty of ${student.faculty} in university ${student.university} and his final grade is ${student.finalGrade}.`,
);

// 5.	Make a set that holds student names.
// a.	Try to add repeated names, will the set accept it?
// b.	Print the set values using spread operator and using for…of.
var studentNames = new Set();
studentNames.add("Alice");
studentNames.add("Bob");
studentNames.add("Charlie");
studentNames.add("Alice"); // Repeated name

for (const element of studentNames) {
  console.log(element);
}
console.log([...studentNames]);
// a. The set will not accept repeated names. "Alice" will only appear once in the set.

// 7.	Search for at least 3 new features in ES.next (not explained in the lecture) and explain them using a demo
// a.	Optional Chaining (?.)
// Optional Chaining allows you to safely access nested object properties
// without causing an error if a property does not exist.
var user = {
  name: "Jane",
  address: {
    street: "123 Main St",
    city: "Anytown",
  },
};
console.log(user?.address?.street); // "123 Main St"
console.log(user?.contact?.phone); // undefined (no error)

// b.Nullish Coalescing Operator (??)
// The Nullish Coalescing Operator is used to provide a default value
// only when the value is null or undefined.
var input;
var defaultValue = "Default";
var result = input ?? defaultValue;
console.log(result); // "Default"
input = "User Input";
result = input ?? defaultValue;
console.log(result); // "User Input"

// c.BigInt
// BigInt is a new numeric type that allows working with very large integers
// larger than the JavaScript limit (2^53 - 1).
var bigInt1 = BigInt(9007199254740991);
var bigInt2 = 1234567890123456789012345678901234567890n;
var bigIntSum = bigInt1 + bigInt2;
console.log("BigInt Sum:", bigIntSum);
// BigInt allows representation of integers larger than 2^53 - 1

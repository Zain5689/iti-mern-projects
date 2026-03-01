const capitalizeText = (input) => {
  if (typeof input !== "string") {
    throw new TypeError("parameter should be string");
  }
  return input.toUpperCase();
};

const createArray = (number) => {
  const myArray = Array.from(Array(number).keys());
  return myArray;
};

export { capitalizeText, createArray };

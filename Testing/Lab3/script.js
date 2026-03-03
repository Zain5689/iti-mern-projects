function sum(vals) {
  let sum = 0;

  vals.forEach((val) => {
    sum += val;
  });

  return sum;
}

function positive(vals) {
  return vals.filter((x) => {
    return x > 0;
  });
}

export { sum, positive };

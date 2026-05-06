export function parseNumberArray(input) {
  if (typeof input !== "string") {
    throw new TypeError("Input must be a string.");
  }

  const values = input
    .split(/\s*,\s*/)
    .filter((item) => item.length > 0)
    .map((item) => Number(item));

  if (values.some((value) => Number.isNaN(value))) {
    throw new Error("Input must contain only valid numbers.");
  }

  return values;
}

function ensureArray(array) {
  if (!Array.isArray(array)) {
    throw new TypeError("Input must be an array.");
  }
}

export function quickSortRecursive(array) {
  ensureArray(array);
  const values = [...array];
  if (values.length < 2) {
    return values;
  }

  const pivot = values[Math.floor(values.length / 2)];
  const less = values.filter((value) => value < pivot);
  const equal = values.filter((value) => value === pivot);
  const greater = values.filter((value) => value > pivot);

  return [
    ...quickSortRecursive(less),
    ...equal,
    ...quickSortRecursive(greater),
  ];
}

export function quickSortIterative(array) {
  ensureArray(array);
  if (array.length < 2) {
    return [...array];
  }

  const values = [...array];
  const stack = [[0, values.length - 1]];

  while (stack.length > 0) {
    const [low, high] = stack.pop();
    if (low >= high) {
      continue;
    }

    const pivotIndex = partition(values, low, high);
    stack.push([low, pivotIndex - 1]);
    stack.push([pivotIndex + 1, high]);
  }

  return values;
}

export function quickSortInPlace(array) {
  ensureArray(array);
  const values = [...array];
  quickSortInPlaceRecursive(values, 0, values.length - 1);
  return values;
}

function quickSortInPlaceRecursive(values, low, high) {
  if (low < high) {
    const pivotIndex = partition(values, low, high);
    quickSortInPlaceRecursive(values, low, pivotIndex - 1);
    quickSortInPlaceRecursive(values, pivotIndex + 1, high);
  }
}

function partition(values, low, high) {
  const pivot = values[high];
  let i = low;

  for (let j = low; j < high; j += 1) {
    if (values[j] <= pivot) {
      [values[i], values[j]] = [values[j], values[i]];
      i += 1;
    }
  }

  [values[i], values[high]] = [values[high], values[i]];
  return i;
}

export function builtInSort(array) {
  ensureArray(array);
  return [...array].sort((a, b) => a - b);
}

export function benchmark(sortFn, array, repeat = 5) {
  if (typeof sortFn !== "function") {
    throw new TypeError("sortFn must be a function.");
  }
  ensureArray(array);
  if (!Number.isInteger(repeat) || repeat <= 0) {
    throw new TypeError("repeat must be a positive integer.");
  }

  const source = [...array];
  const durations = [];

  for (let i = 0; i < repeat; i += 1) {
    const input = [...source];
    const start = performance.now();
    sortFn(input);
    durations.push(performance.now() - start);
  }

  const total = durations.reduce((sum, value) => sum + value, 0);
  const average = total / durations.length;

  return {
    average,
    durations,
    result: sortFn(source),
  };
}

import {
  parseNumberArray,
  quickSortRecursive,
  quickSortIterative,
  quickSortInPlace,
  builtInSort,
  benchmark,
} from "./quickSort.js";

const arrayInput = document.getElementById("array-input");
const algorithmSelect = document.getElementById("algorithm-select");
const sortButton = document.getElementById("sort-button");
const benchmarkButton = document.getElementById("benchmark-button");
const errorMessage = document.getElementById("error-message");
const statusMessage = document.getElementById("status-message");
const sortedOutput = document.getElementById("sorted-output");
const performanceOutput = document.getElementById("performance-output");

function displayError(message) {
  errorMessage.textContent = message;
}

function displayStatus(message) {
  statusMessage.textContent = message;
}

function displaySortedOutput(values) {
  sortedOutput.textContent = values.join(", ");
}

function displayPerformance(message) {
  performanceOutput.textContent = message;
}

function getSortFunction(key) {
  switch (key) {
    case "recursive":
      return quickSortRecursive;
    case "iterative":
      return quickSortIterative;
    case "in-place":
      return quickSortInPlace;
    case "builtin":
      return builtInSort;
    default:
      return quickSortRecursive;
  }
}

function sortArray() {
  try {
    displayError("");
    displayStatus("");
    displayPerformance("No benchmark performed yet.");

    const values = parseNumberArray(arrayInput.value);
    if (values.length === 0) {
      displayError("Please enter at least one number.");
      displaySortedOutput([]);
      return;
    }

    const algorithm = algorithmSelect.value;
    const sortFn = getSortFunction(algorithm);
    const sorted = sortFn(values);

    displaySortedOutput(sorted);
    displayStatus("Sorted successfully.");
  } catch (error) {
    displaySortedOutput([]);
    displayPerformance("No benchmark available.");
    displayError(error.message);
  }
}

// Run benchmark and display results
function runBenchmark() {
  try {
    displayError("");
    displayStatus("");

    const values = parseNumberArray(arrayInput.value);
    if (values.length === 0) {
      displayError("Please enter at least one number to benchmark.");
      displaySortedOutput([]);
      return;
    }

    const algorithm = algorithmSelect.value;
    const sortFn = getSortFunction(algorithm);
    const builtInResult = benchmark(builtInSort, values, 5);
    const algorithmResult = benchmark(sortFn, values, 5);

    displaySortedOutput(algorithmResult.result);
    displayPerformance(
      `Selected algorithm (${algorithm}) average: ${algorithmResult.average.toFixed(3)} ms\n` +
        `Built-in sort average: ${builtInResult.average.toFixed(3)} ms\n` +
        `Difference: ${(algorithmResult.average - builtInResult.average).toFixed(3)} ms`,
    );
    displayStatus("Benchmark complete.");
  } catch (error) {
    displaySortedOutput([]);
    displayPerformance("No benchmark available.");
    displayError(error.message);
  }
}

sortButton.addEventListener("click", sortArray);
benchmarkButton.addEventListener("click", runBenchmark);

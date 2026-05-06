# QuickSort Lab

## Overview

This lab implements the QuickSort algorithm in JavaScript and includes:

- recursive QuickSort
- iterative QuickSort using an explicit stack
- in-place QuickSort
- built-in sort comparison
- browser UI for user input
- performance benchmarking
- unit tests using Jest

## Files

- `index.html` — user interface for array entry, algorithm selection, and results display.
- `styles.css` — simple styling for the lab page.
- `quickSort.js` — algorithm implementations, helper parser, and benchmark support.
- `main.js` — UI wiring, sorting flow, and benchmark reporting.
- `quickSort.test.js` — unit tests for sorting correctness and input parsing.
- `package.json` — node configuration for Jest testing.
- `README.md` — user-facing project documentation.

## How Copilot Helped

I used Copilot to:

1. generate a basic QuickSort implementation and suggest a stable partition function.
2. create a second, iterative QuickSort version for comparison.
3. design the browser UI and the benchmark helper structure.
4. compose test cases covering edge cases like empty arrays, duplicates, and reverse-ordered input.

## Algorithm Comparison

- **QuickSort (recursive)**: average-case O(n log n), worst-case O(n^2) when pivot choices are poor.
- **QuickSort (iterative)**: same complexity as recursive QuickSort, but avoids deep recursion by managing a stack explicitly.
- **QuickSort (in-place)**: uses the same partition strategy, sorts without creating many intermediate arrays.
- **Built-in sort**: JavaScript uses a hybrid sort algorithm that is very fast in practice and usually outperforms custom sorts on small arrays.

## Benchmark Notes

The UI includes a benchmark mode that measures the average runtime of the selected algorithm and compares it against built-in sort.
Because QuickSort is implemented in JavaScript, the built-in sort is often faster for small arrays due to internal engine optimizations.

## Running the Lab

1. Open `index.html` in the browser.
2. Enter numbers separated by commas.
3. Choose a sorting algorithm.
4. Click `Sort Array` to see the sorted results.
5. Click `Run Benchmark` to compare performance against built-in sort.

## Testing

To run tests (after installing dependencies):

```bash
cd "Task2/quick-sort-lab"
npm install
npm test
```

## Next Improvements

- Add MergeSort and HeapSort implementations
- Add a visualization of sorting steps
- Add an API endpoint for remote sorting requests
- Add a dropdown to select multiple sorting algorithms for direct comparison

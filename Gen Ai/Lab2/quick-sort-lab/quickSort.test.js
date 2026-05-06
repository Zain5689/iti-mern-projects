import {
  parseNumberArray,
  quickSortRecursive,
  quickSortIterative,
  quickSortInPlace,
  builtInSort,
} from './quickSort.js';

describe('QuickSort implementations', () => {
  const testCases = [
    { name: 'empty array', input: [], expected: [] },
    { name: 'single element', input: [5], expected: [5] },
    { name: 'sorted array', input: [1, 2, 3, 4, 5], expected: [1, 2, 3, 4, 5] },
    { name: 'reverse sorted', input: [9, 5, 3, 1], expected: [1, 3, 5, 9] },
    { name: 'duplicates', input: [4, 2, 4, 1, 2], expected: [1, 2, 2, 4, 4] },
    { name: 'random values', input: [7, 1, 9, 4, 6, 2], expected: [1, 2, 4, 6, 7, 9] },
  ];

  const algorithms = [
    { name: 'recursive', fn: quickSortRecursive },
    { name: 'iterative', fn: quickSortIterative },
    { name: 'in-place', fn: quickSortInPlace },
    { name: 'built-in', fn: builtInSort },
  ];

  algorithms.forEach((algorithm) => {
    describe(`${algorithm.name} QuickSort`, () => {
      testCases.forEach((testCase) => {
        test(`correctly sorts ${testCase.name}`, () => {
          const output = algorithm.fn(testCase.input);
          expect(output).toEqual(testCase.expected);
        });
      });
    });
  });
});

describe('Input parser', () => {
  test('parses comma-separated numbers', () => {
    expect(parseNumberArray('1, 2,3, 4')).toEqual([1, 2, 3, 4]);
  });

  test('ignores empty values', () => {
    expect(parseNumberArray('1, , 2,')).toEqual([1, 2]);
  });

  test('throws on invalid numbers', () => {
    expect(() => parseNumberArray('1, two, 3')).toThrow('Input must contain only valid numbers.');
  });
});

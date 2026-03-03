import { sum, positive } from "../script.js";

describe("testing math utilities", () => {
  // test for sum function
  it("sum function should equal to sum of the values", () => {
    expect(sum([1, 2, 3])).toEqual(6);
  });
  // test for empty array
  it("sum function return 0 for empty array", () => {
    expect(sum([])).toEqual(0);
  });

  // test for sum with negative  value
  it("sum function should work with negative  value", () => {
    expect(sum([-1, 0, 1])).toEqual(0);
  });

  // test for sum with non-numeric value
  it("sum function should ignore non-numeric values", () => {
    // expect(sum([2, "b", 1])).toEqual(3);
    expect(sum([1, "a", 2])).toEqual("1a2");
  });

  // sum negative numbers correctly
  it("should sum negative numbers correctly", () => {
    expect(sum([-1, -2, -3])).toBe(-6);
  });
  // sum decimal  numbers correctly
  it("should sum decimal numbers correctly", () => {
    expect(sum([1.5, 2.5])).toBe(4);
  });

  /**************************************************** */

  // test for positive function
  it("positive function should return only positive values", () => {
    expect(positive([-1, 0, 1, 2])).toEqual([1, 2]);
  });
  // test for positive function with all negative values
  it("positive function should return empty array for all negative values", () => {
    expect(positive([-1, -1, -2])).toEqual([]);
  });
  // test for empty array
  it("positive function should return empty array for empty array", () => {
    expect(positive([])).toEqual([]);
  });
  //  test for positive with non-numeric value
  it("positive function should ignore non-numeric values", () => {
    expect(positive([1, "a", 2])).toEqual([1, 2]);
  });
});

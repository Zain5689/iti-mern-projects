import { createArray } from "../script.js";

describe("createArray Function", () => {
  it("should return an array", () => {
    expect(Array.isArray(createArray(3))).toBeTrue();
  });

  it("should return [0,1,2] when input is 3", () => {
    expect(createArray(3)).toEqual([0, 1, 2]);
  });
});

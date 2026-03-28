import { describe, expect, test } from "vitest";
import { add } from "./main";

describe("ad function operation", () => {
  test("add 2 to 3 equal 5", () => {
    const result = add(2, 3);

    const expectedResult = 5;
    expect(result).toBe(expectedResult);
  });

  test("add -2 to -3 equal -5", () => {
    const result = add(-2, -3);

    const expectedResult = -5;
    expect(result).toBe(expectedResult);
  });

  test("test matchers", () => {
    expect("hello").toBe("hello");

    const user = { name: "zoza" };
    expect(user).toEqual({ name: "zoza" });

    expect(true).toBeTruthy();
    expect(false).toBeFalsy();
    expect(0).toBeFalsy();
    expect("").toBeFalsy();
    expect(-0).toBeFalsy();
    expect(NaN).toBeFalsy();
    expect(undefined).toBeFalsy();

    const shoppingList = ["1", "2", "3"];
    expect(shoppingList).toContain("2");
    expect(shoppingList).toHaveLength(3);

    //const fake = 100;
  });
});

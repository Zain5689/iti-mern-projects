import { capitalizeText, createArray } from "../script.js";
import { assert, expect, should } from "chai";
should();

describe("capitalizeText Function", function () {
  it("should return a string when input is a string", function () {
    const result = capitalizeText("iti");
    expect(typeof result).to.equal("string");
  });

  it("should return the string after capitalizing iti", function () {
    const result = capitalizeText("iti");
    expect(result).to.equal("ITI");
  });

  it("should throw TypeError when input is a number", function () {
    expect(() => capitalizeText(12)).to.throw(
      TypeError,
      "parameter should be string",
    );
  });

  it("should not return 'hello' when input is 'iti'", function () {
    const result = capitalizeText("iti");
    expect(result).to.not.equal("hello");
  });
});

// *****************************************************

describe("createArray Function", function () {
  this.timeout(10000); // allow 5s delay

  let number = 1;
  let result;

  // Delay before each test
  beforeEach(function (done) {
    setTimeout(() => {
      result = createArray(number);
      done();
    }, 5000);
  });

  // Increase number before each test
  beforeEach(function () {
    number++;
  });

  it("should return an array", function () {
    const testArray = createArray(number);
    expect(Array.isArray(testArray)).to.be.true;
    //     assert.isArray(testArray, "Result should be an array");
    //     testArray.should.be.an("array");
  });

  it("should return an array of length 3 and include 1 when input is 3", function () {
    const testArray = createArray(3);
    expect(testArray.length).to.equal(3);
    expect(testArray).to.include(1);

    //     assert.lengthOf(testArray, 3, "Array length is 3");
    //     assert.include(testArray, 1, "Array includes 1");

    //     testArray.should.have.lengthOf(3);
    //     testArray.should.include(1);
  });

  it("should return an array of length number when input is number", function () {
    const testArray = createArray(number);
    expect(testArray.length).to.equal(number);

    //     assert.lengthOf(testArray, number, `Length is ${number}`);
    //     testArray.should.have.lengthOf(number);
  });

  it("pending test example");
});

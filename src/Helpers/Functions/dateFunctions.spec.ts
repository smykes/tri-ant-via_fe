// Don't need following line because of the tsconfig
// import { expect, test, describe } from "vitest";
import {
  getMonthByString,
  getNextMonthNormalized,
  getPreviousMonthNormalized,
} from "./dateFunctions";

describe("Get Month By String", () => {
  test("expect 11 to be November", () => {
    expect(getMonthByString("11")).toEqual("November");
  });

  test("expect 1 to be January", () => {
    expect(getMonthByString("1")).toEqual("January");
  });
});

describe("Get Next Month Normalized", () => {
  test("expect 0 to to equal 01", () => {
    expect(getNextMonthNormalized(0)).toEqual("01");
  });

  test("expect 8 to to equal 09", () => {
    expect(getNextMonthNormalized(8)).toEqual("09");
  });

  test("expect 14 to to equal 01", () => {
    expect(getNextMonthNormalized(14)).toEqual("01");
  });
});

describe("Get Previous Month Normalized", () => {
  test("expect 1 to equal 12", () => {
    expect(getPreviousMonthNormalized(0)).toEqual("01");
  });

  test("expect 8 to to equal 09", () => {
    expect(getNextMonthNormalized(8)).toEqual("09");
  });
});

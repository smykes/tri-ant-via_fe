// Don't need following line because of the tsconfig
// import { expect, test, describe } from "vitest";
import { describe, expect, test } from "vitest";
import {
  getMonthByString,
  getNextMonthNormalized,
  getPreviousMonthNormalized,
  getZeroLedMonthYear,
} from "./dateFunctions";

describe("getZeroLedMonthYear", () => {
  test("expect october 2024 to be 10/2024"),
    () => {
      const date = new Date(
        "Wed Oct 16 2024 15:32:53 GMT-0500 (Central Daylight Time)"
      );
      expect(getZeroLedMonthYear(date)).toEqual("10/2024");
    };
  test("expect april 2024 to be 04/2024"),
    () => {
      const date = new Date(
        "Wed April 16 2024 15:32:53 GMT-0500 (Central Daylight Time)"
      );
      expect(getZeroLedMonthYear(date)).toEqual("04/2024");
    };
});

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

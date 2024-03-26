import { beforeEach, describe, expect, test } from "vitest";
import { render, screen } from "../../utils/test-utils";
import { Landing } from "./Landing";
import React from "react";

beforeEach(() => {
  render(<Landing />);
});

describe("Landing Page Renders", () => {
  test("A main message appears", () => {
    const mainHeader = screen.getByText(
      /Trivia results at your antennae tips./i
    );
    expect(mainHeader).toBeInTheDocument();
  });
  test("A secondary message appears", () => {
    const secondaryMessage = screen.getByText(/Welcome to the colony.../i);
    expect(secondaryMessage).toBeInTheDocument();
  });
  test("A link to a copyright holder is present", () => {
    expect(screen.getByRole("link", { name: "Sciants Media" })).toHaveAttribute(
      "href",
      "https://sciantsmedia.com"
    );
  });
});

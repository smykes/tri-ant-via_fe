/**
 * @vitest-environment jsdom
 */
import { NotFound } from "./NotFound";
import { render, screen } from "../../utils/test-utils";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import React from "react";

describe("Not Found", async () => {
  it("Renders the page with the heading 'You Seem to have lost the pheremone trail...'", async () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );
    const header = await screen.findByText(
      "You seem to have lost the pheremone trail..."
    ); // await screen.findByRole("heading");
    expect(header).toHaveTextContent(
      "You seem to have lost the pheremone trail..."
    );
  });
  it("Renders a link to go to company home page", async () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );
    await screen.findByText("Sciants Media");
    expect(screen.getByRole("link", { name: "Sciants Media" })).toHaveAttribute(
      "href",
      "https://sciantsmedia.com"
    );
  });
  it("Renders a link to go to back to home page", async () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );
    await screen.findByText("Head back to the colonoy");
    expect(
      screen.getByRole("link", { name: "Head back to the colonoy" })
    ).toHaveAttribute("href", "/");
  });
  it("Renders an image of a confused andt", async () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );
    const image = await screen.findByAltText("A confused ant.");
    expect(expect(image.getAttribute("src")).toBe("/images/ant_columbo.png"));
  });
});

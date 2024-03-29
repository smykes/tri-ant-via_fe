/**
 * @vitest-environment jsdom
 */
import { Names } from "./Names";
import { render, screen } from "../../utils/test-utils";
import { Endpoint } from "../../constants";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { UsersList } from "../../test/mocks/mockData";
import React from "react";

describe("Names", () => {
  it("MSW Intercepts call", async () => {
    const response = await fetch(`${Endpoint.BACKEND_API}trivia/users`);
    expect(response.status).toBe(200);
    expect(response.statusText).toBe("OK");
    expect(await response.json()).toEqual(UsersList);
  });
  it("Renders the page with the heading 'Competitors'", async () => {
    render(
      <BrowserRouter>
        <Names />
      </BrowserRouter>
    );
    const header = await screen.findByText("Competitors"); // await screen.findByRole("heading");
    expect(header).toHaveTextContent("Competitors");
  });
  it("Renders a players name", async () => {
    render(
      <BrowserRouter>
        <Names />
      </BrowserRouter>
    );
    await screen.findByText("@CanaDNA");
    expect(screen.getByRole("link", { name: "@CanaDNA" })).toHaveAttribute(
      "href",
      "/winner/@CanaDNA"
    );
  });
  it("Renders six players name", async () => {
    render(
      <BrowserRouter>
        <Names />
      </BrowserRouter>
    );
    await screen.findAllByTestId("individual_user");
    expect(screen.getAllByRole("list")).toHaveLength(6);
  });
});

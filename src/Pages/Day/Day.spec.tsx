/**
 * @vitest-environment jsdom
 */

// Add a test for empty array.
import React from "react";
import Day from "./Day";
import { render, screen } from "../../utils/test-utils";
import { Endpoint } from "../../constants";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { Day as DayData } from "../../test/mocks/mockData";
describe("Not Found", async () => {
  const month = "11";
  const day = "12";
  const year = "2024";

  it("MSW Intercepts call", async () => {
    const response = await fetch(
      `${Endpoint.BACKEND_API}trivia/day/${month}/${day}/${year}`
    );
    expect(response.status).toBe(200);
    expect(response.statusText).toBe("OK");
    expect(await response.json()).toEqual(DayData);
  });

  it("Render a page a successfully", async () => {
    render(
      <MemoryRouter initialEntries={[`/day/${month}/${day}/${year}`]}>
        <Routes>
          <Route path="/day/:month/:day/:year" element={<Day />} />
        </Routes>
      </MemoryRouter>
    );
    const playerName = await screen.findByText("@kk_gotit_goinon");
    expect(playerName).toHaveTextContent("@kk_gotit_goinon");

    screen.debug();
  });
  it("Renders the correct date in the navigation", async () => {
    render(
      <MemoryRouter initialEntries={[`/day/${month}/${day}/${year}`]}>
        <Routes>
          <Route path="/day/:month/:day/:year" element={<Day />} />
        </Routes>
      </MemoryRouter>
    );
    const dateHeader = await screen.findByText("Trivia of the Day - 3/2/2024");
    expect(dateHeader).toHaveTextContent("Trivia of the Day - 3/2/2024");
  });
});

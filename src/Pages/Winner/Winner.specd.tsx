// /**
//  * @vitest-environment jsdom
//  */
// import React from "react";
// import { Winner } from "./Winner";
// import { render, screen } from "../../utils/test-utils";
// import { BrowserRouter } from "react-router-dom";
// import { describe, expect, it } from "vitest";

// describe("Not Found", async () => {
//   it("Renders the page with the heading 'You Seem to have lost the pheremone trail...'", async () => {
//     render(
//       <BrowserRouter>
//         <Winner />
//       </BrowserRouter>
//     );
//     const header = await screen.findByText(
//       "You seem to have lost the pheremone trail..."
//     ); // await screen.findByRole("heading");
//     expect(header).toHaveTextContent(
//       "You seem to have lost the pheremone trail..."
//     );
//   });
// });

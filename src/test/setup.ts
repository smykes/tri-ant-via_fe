import "@testing-library/jest-dom";
import { fetch } from "cross-fetch";
import { server } from "./mocks/server";
import { afterAll, afterEach, beforeAll } from "vitest";
global.fetch = fetch;

beforeAll(() => server.listen({ onUnhandledRequest: "warn" }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

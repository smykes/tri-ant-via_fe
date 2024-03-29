import { http, HttpResponse } from "msw";
import { Endpoint } from "../../constants";
import { UsersList, Day } from "./mockData";

export const handlers = [
  http.get(`${Endpoint.BACKEND_API}trivia/users`, () => {
    return HttpResponse.json(UsersList, { status: 200 });
  }),
  http.get(`${Endpoint.BACKEND_API}trivia/day/11/12/2024`, () => {
    return HttpResponse.json(Day, { status: 200 });
  }),
];

import { http, HttpResponse } from "msw";
import { Endpoint } from "../../constants";

export const handlers = [
  http.get(`${Endpoint.BACKEND_API}trivia/users`, () => {
    return HttpResponse.json(
      [
        "@CanaDNA",
        "@Celista",
        "@Tactix47",
        "@Tarzan_2319",
        "@TowardsNight",
        "@atalanoa",
      ],
      { status: 200 }
    );
  }),
];

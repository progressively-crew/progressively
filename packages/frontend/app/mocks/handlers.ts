import { rest } from "msw";
import { progressivelyApiMocks } from "./data";

export const handlers = progressivelyApiMocks.map((route) =>
  rest.get(route.path, (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(route.body));
  })
);

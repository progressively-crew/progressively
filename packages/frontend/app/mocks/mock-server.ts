import { progressivelyApiMocks } from "./data";
import { setupServer } from "msw/node";
import { rest } from "msw";

// This configures a request mocking server with the given request handlers.

export const startServer = () => {
  const handlers = progressivelyApiMocks.map((route) =>
    rest.get(route.path, (req, res, ctx) => {
      return res(ctx.json(route.body));
    })
  );

  const server = setupServer(...handlers);
  server.listen();

  console.info("[Server] Mock initialized");
};

import { rest } from "msw";
import { setupServer } from "msw/node";

export const startMockServer = () => {
  const server = setupServer(
    rest.get("https://api.progressively.app/sdk/*", (req, res, ctx) => {
      console.log("API shooted");
      return res(ctx.json({ showDocumentationButton: false }));
    })
  );

  server.listen();
};

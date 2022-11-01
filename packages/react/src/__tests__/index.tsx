import React from "react";
import { render as renderTL, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import fetch from "node-fetch";
import "@testing-library/jest-dom";
import { ProgressivelyProvider } from "../ProgressivelyProvider";
import { ProgressivelyProviderProps } from "../types";
import { useFlags } from "../useFlags";

const FlaggedComponent = () => {
  const { flags, error, isLoading } = useFlags();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  if (flags.newHomepage) {
    return <div style={{ background: "red", color: "white" }}>New variant</div>;
  }

  return <div style={{ background: "lightblue" }}>Old variant</div>;
};

describe("React-sdk root", () => {
  const render = (props?: ProgressivelyProviderProps) =>
    renderTL(
      <ProgressivelyProvider
        {...(props || {})}
        clientKey="valid-sdk-key"
        websocketUrl="ws://localhost:4000"
        apiUrl="http://localhost:4000"
      >
        <FlaggedComponent />
      </ProgressivelyProvider>
    );

  const FLAG_ENDPOINT = `http://localhost:4000*`;
  const worker = setupServer();
  let socket: any;

  beforeEach(() => {
    socket = { close: jest.fn() };
    (global as any).fetch = jest.fn(fetch);
    (global as any).WebSocket = jest.fn(() => socket);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  beforeAll(() => worker.listen());
  afterEach(() => worker.resetHandlers());
  afterAll(() => worker.close());

  describe("[CSR] initial loading", () => {
    it("shows the initial flags after loading (newHomepage is false)", async () => {
      worker.use(
        rest.get(FLAG_ENDPOINT, (_, res, ctx) => {
          return res(ctx.json({ newHomepage: false }));
        })
      );

      render();

      await waitFor(() => {
        expect(screen.getByText("Old variant")).toBeInTheDocument();
      });
    });

    it("shows the initial flags after loading (newHomepage is true)", async () => {
      worker.use(
        rest.get(FLAG_ENDPOINT, (_, res, ctx) => {
          return res(ctx.json({ newHomepage: true }));
        })
      );

      render();

      await waitFor(() =>
        expect(screen.getByText("New variant")).toBeInTheDocument()
      );
    });

    it("should render an error", async () => {
      worker.use(
        rest.get(FLAG_ENDPOINT, (_, res, ctx) => {
          return res(ctx.status(500));
        })
      );

      render();

      await waitFor(() => {
        expect(screen.getByText("Error")).toBeInTheDocument();
      });
    });
  });

  describe("[SSR] initial loading", () => {
    beforeEach(() => {
      worker.use(
        rest.get(FLAG_ENDPOINT, (_, res, ctx) => {
          return res(ctx.json({}));
        })
      );
    });

    it("shows the initial flags after loading (newHomepage is false)", async () => {
      render({
        initialFlags: { newHomepage: false },
        clientKey: "valid-sdk-key",
      });

      await waitFor(() => {
        expect(screen.getByText("Old variant")).toBeInTheDocument();
      });
    });

    it("shows the initial flags after loading (newHomepage is true)", async () => {
      render({
        initialFlags: { newHomepage: true },
        clientKey: "valid-sdk-key",
      });

      await waitFor(() =>
        expect(screen.getByText("New variant")).toBeInTheDocument()
      );
    });
  });

  describe("WebSocket init", () => {
    it("[From CSR loads and React Native] Socket init through HTTP header", async () => {
      worker.use(
        rest.get(FLAG_ENDPOINT, (_, res, ctx) => {
          return res(
            ctx.json({ newHomepage: true }),
            ctx.set("X-progressively-id", "abcd")
          );
        })
      );

      render();

      await waitFor(() =>
        expect(screen.getByText("New variant")).toBeInTheDocument()
      );

      expect(global.WebSocket).toHaveBeenCalledWith(
        "ws://localhost:4000?opts=eyJjbGllbnRLZXkiOiJ2YWxpZC1zZGsta2V5IiwiaWQiOiJhYmNkIn0="
      );
    });
  });
});

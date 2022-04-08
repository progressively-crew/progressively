import {
  expect,
  describe,
  beforeAll,
  afterAll,
  afterEach,
  beforeEach,
  it,
} from "@jest/globals";
import { rest } from "msw";
import { setupServer } from "msw/node";
import fetch from "node-fetch";
import { WebSocketServer, WebSocket } from "ws";
import Sdk from "../";

describe("SDK", () => {
  const sendMessage = (data: any) => {
    // Poll to check the websocket registration. Not perfect, but it works
    intervalId = setInterval(() => {
      if (ws) {
        ws.send(JSON.stringify({ data }));
        clearInterval(intervalId);
      }
    }, 100);
  };

  // HTTP
  (globalThis as any).fetch = fetch;
  const FLAG_ENDPOINT = `http://localhost:4000*`;
  const worker = setupServer();

  beforeAll(() => worker.listen());
  afterEach(() => worker.resetHandlers());
  afterAll(() => worker.close());

  // WS
  (globalThis as any).WebSocket = WebSocket;
  let wss: WebSocketServer;
  let ws: WebSocket;
  let intervalId: NodeJS.Timer;

  beforeEach(() => {
    wss = new WebSocketServer({
      port: 1234,
    });

    wss.on("connection", (websocket) => {
      ws = websocket;
    });
  });

  afterEach(() => {
    clearInterval(intervalId);
    wss.clients.forEach((client) => client.terminate());
    wss.close();
  });

  it("loads the flag when calling loadFlags", async () => {
    worker.use(
      rest.get(FLAG_ENDPOINT, (_, res, ctx) => {
        return res(ctx.json({ flag: true, flag2: false }));
      })
    );

    const sdk = Sdk.init("client-key");

    const flags = await sdk.loadFlags();

    expect(flags).toEqual({ flag: true, flag2: false });
  });

  it("sets the flag when receiving a valid message when no flags are set", (done) => {
    const sdk = Sdk.init("client-key", { websocketUrl: "ws://localhost:1234" });

    sendMessage({ hello: true });

    sdk.onFlagUpdate((flags) => {
      expect(flags).toEqual({ hello: true });
      done();
    });
  });

  it("sets the flag when receiving a valid message when some flags already exists", (done) => {
    worker.use(
      rest.get(FLAG_ENDPOINT, (_, res, ctx) => {
        return res(ctx.json({ flag: true, flag2: false }));
      })
    );

    const sdk = Sdk.init("client-key", { websocketUrl: "ws://localhost:1234" });

    sdk.onFlagUpdate((flags) => {
      ws.terminate();
      expect(flags).toEqual({ hello: true, flag: true, flag2: false });
      done();
    });

    sdk.loadFlags().then(() => {
      sendMessage({ hello: true });
    });
  });
});

import { rest } from "msw";
import { setupServer } from "msw/node";
import fetch from "node-fetch";
import { WebSocketServer, WebSocket } from "ws";
import { Progressively as Sdk } from "../";

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
  (globalThis as any).fetch = jest.fn(fetch);
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
    window.localStorage.clear();
  });

  describe("loading the flags", () => {
    it("loads the flag when calling loadFlags", async () => {
      worker.use(
        rest.get(FLAG_ENDPOINT, (_, res, ctx) => {
          return res(ctx.json({ flag: true, flag2: false }));
        })
      );

      const sdk = Sdk.init("client-key", {
        websocketUrl: "ws://localhost:1234",
        apiUrl: "http://localhost:4000",
      });

      const { flags } = await sdk.loadFlags();

      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:4000/sdk/eyJjbGllbnRLZXkiOiJjbGllbnQta2V5In0=",
        { credentials: "include" }
      );

      expect(flags).toEqual({ flag: true, flag2: false });
    });

    it("loads the in-memory flag when calling loadFlags and the server throws a 500", async () => {
      worker.use(
        rest.get(FLAG_ENDPOINT, (_, res, ctx) => {
          return res(ctx.status(500));
        })
      );

      const sdk = Sdk.init("client-key", {
        websocketUrl: "ws://localhost:1234",
        apiUrl: "http://localhost:4000",
      });

      const { flags } = await sdk.loadFlags();

      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:4000/sdk/eyJjbGllbnRLZXkiOiJjbGllbnQta2V5In0=",
        { credentials: "include" }
      );

      expect(flags).toEqual({});
    });

    it("loads the in-memory flag when calling client side fails", async () => {
      worker.use(
        rest.get(FLAG_ENDPOINT, (_, res) => {
          return res.networkError("Failed to connect");
        })
      );

      const sdk = Sdk.init("client-key", {
        websocketUrl: "ws://localhost:1234",
        apiUrl: "http://localhost:4000",
      });

      const { flags } = await sdk.loadFlags();

      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:4000/sdk/eyJjbGllbnRLZXkiOiJjbGllbnQta2V5In0=",
        { credentials: "include" }
      );

      expect(flags).toEqual({});
    });

    it("loads the flag when calling loadFlags with fields", async () => {
      worker.use(
        rest.get(FLAG_ENDPOINT, (_, res, ctx) => {
          return res(ctx.json({ flag: true, flag2: false }));
        })
      );

      const sdk = Sdk.init("client-key", {
        fields: { email: "john.doe@gmail.com", id: "some-super-cool-id" },
        websocketUrl: "ws://localhost:1234",
        apiUrl: "http://localhost:4000",
      });

      await sdk.loadFlags();

      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:4000/sdk/eyJlbWFpbCI6ImpvaG4uZG9lQGdtYWlsLmNvbSIsImlkIjoic29tZS1zdXBlci1jb29sLWlkIiwiY2xpZW50S2V5IjoiY2xpZW50LWtleSJ9",
        { credentials: "include" }
      );
    });

    it("loads the initial flag from local storage when the network fails and no initial flags", async () => {
      const sdk = Sdk.init("client-key", {
        websocketUrl: "ws://localhost:1234",
        apiUrl: "http://localhost:4000",
      });

      // First request sets the flag in local storage
      worker.use(
        rest.get(FLAG_ENDPOINT, (_, res, ctx) => {
          return res(ctx.json({ hello: true, world: false }));
        })
      );

      await sdk.loadFlags();

      worker.use(
        rest.get(FLAG_ENDPOINT, (_, res) => {
          return res.networkError("Failed to connect");
        })
      );

      const { flags } = await sdk.loadFlags();

      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:4000/sdk/eyJjbGllbnRLZXkiOiJjbGllbnQta2V5In0=",
        { credentials: "include" }
      );

      expect(flags).toEqual({ hello: true, world: false });
    });

    it("loads the initial flag from the options when the initialFlags is passed", async () => {
      worker.use(
        rest.get(FLAG_ENDPOINT, (_, res) => {
          return res.networkError("Failed to connect");
        })
      );

      const sdk = Sdk.init("client-key", {
        websocketUrl: "ws://localhost:1234",
        apiUrl: "http://localhost:4000",
        initialFlags: {
          world: true,
        },
      });

      const { flags } = await sdk.loadFlags();

      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:4000/sdk/eyJjbGllbnRLZXkiOiJjbGllbnQta2V5In0=",
        { credentials: "include" }
      );

      expect(flags).toEqual({ world: true });
    });

    it("loads the initial flag from the options when the initialFlags is passed", async () => {
      worker.use(
        rest.get(FLAG_ENDPOINT, (_, res) => {
          return res.networkError("Failed to connect");
        })
      );

      const sdk = Sdk.init("client-key", {
        websocketUrl: "ws://localhost:1234",
        apiUrl: "http://localhost:4000",
        initialFlags: {
          world: true,
        },
      });

      const { flags } = await sdk.loadFlags();

      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:4000/sdk/eyJjbGllbnRLZXkiOiJjbGllbnQta2V5In0=",
        { credentials: "include" }
      );

      expect(flags).toEqual({ world: true });
    });

    it("loads the initial flag from the options when the initialFlags is passed", async () => {
      worker.use(
        rest.get(FLAG_ENDPOINT, (_, res) => {
          return res.networkError("Failed to connect");
        })
      );

      const sdk = Sdk.init("client-key", {
        websocketUrl: "ws://localhost:1234",
        apiUrl: "http://localhost:4000",
        initialFlags: {
          world: true,
        },
      });

      const { flags } = await sdk.loadFlags();

      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:4000/sdk/eyJjbGllbnRLZXkiOiJjbGllbnQta2V5In0=",
        { credentials: "include" }
      );

      expect(flags).toEqual({ world: true });
    });
  });

  describe("sending flag updates", () => {
    it("sets the flag when receiving a valid message when no flags are set", (done) => {
      const sdk = Sdk.init("client-key", {
        websocketUrl: "ws://localhost:1234",
        apiUrl: "http://localhost:4000",
      });

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

      const sdk = Sdk.init("client-key", {
        websocketUrl: "ws://localhost:1234",
        apiUrl: "http://localhost:4000",
      });

      sdk.onFlagUpdate((flags) => {
        ws.terminate();
        expect(flags).toEqual({ hello: true, flag: true, flag2: false });
        done();
      });

      sdk.loadFlags().then(() => {
        sendMessage({ hello: true });
      });
    });

    it("calls the websocket constructor with the fields paramaters but without ID (id is set manually in onFlagUpdate)", () => {
      (global as any).WebSocket = jest.fn() as any;

      const sdk = Sdk.init("client-key", {
        websocketUrl: "ws://localhost:1234",
        apiUrl: "http://localhost:4000",
        fields: { email: "john.doe@gmail.com", id: "some-super-cool-id" },
      });

      sdk.onFlagUpdate(() => {});
      expect((global as any).WebSocket).toHaveBeenCalledWith(
        "ws://localhost:1234?opts=eyJlbWFpbCI6ImpvaG4uZG9lQGdtYWlsLmNvbSIsImNsaWVudEtleSI6ImNsaWVudC1rZXkifQ=="
      );
    });

    it("calls the websocket constructor with the fields paramaters AND the user id (passed as second args of onFlagUpdate)", () => {
      (global as any).WebSocket = jest.fn() as any;

      const sdk = Sdk.init("client-key", {
        websocketUrl: "ws://localhost:1234",
        apiUrl: "http://localhost:4000",
        fields: { email: "john.doe@gmail.com", id: "some-super-cool-id" },
      });

      sdk.onFlagUpdate(() => {}, "real-id");
      expect((global as any).WebSocket).toHaveBeenCalledWith(
        "ws://localhost:1234?opts=eyJlbWFpbCI6ImpvaG4uZG9lQGdtYWlsLmNvbSIsImlkIjoicmVhbC1pZCIsImNsaWVudEtleSI6ImNsaWVudC1rZXkifQ=="
      );
    });
  });

  describe("disconnect", () => {
    it("does nothing", () => {
      const sdk = Sdk.init("client-key", {
        websocketUrl: "ws://localhost:1234",
        apiUrl: "http://localhost:4000",
      });

      sdk.disconnect();
    });

    it("disconnects the socket when it s set", () => {
      const socket = { close: jest.fn() };
      (global as any).WebSocket = jest.fn(() => socket) as any;

      const sdk = Sdk.init("client-key", {
        websocketUrl: "ws://localhost:1234",
        apiUrl: "http://localhost:4000",
      });

      sdk.onFlagUpdate(() => {});
      sdk.disconnect();

      expect(socket.close).toBeCalled();
    });
  });
});

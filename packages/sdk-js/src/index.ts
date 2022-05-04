import { Fields, FlagDict, ProgressivelySdkType, SDKOptions } from "./types";

export * from "./types";

function init(clientKey: string, options?: SDKOptions): ProgressivelySdkType {
  const fields: Fields = options?.fields || {};

  // HTTP specific
  const apiRoot = options?.apiUrl || "http://localhost:4000";
  const flagEndpoint = new URL(`${apiRoot}/sdk/${clientKey}`);
  for (const field in fields) {
    flagEndpoint.searchParams.set(field, String(fields[field]));
  }

  // Websocket specific
  const websocketRoot = options?.websocketUrl || "ws://localhost:4001";
  const websocketUrl = new URL(websocketRoot);
  websocketUrl.searchParams.set("client_key", clientKey);
  for (const field in fields) {
    websocketUrl.searchParams.set(field, String(fields[field]));
  }

  return Sdk(
    flagEndpoint.toString(),
    websocketUrl,
    options?.initialFlags || {}
  );
}

function Sdk(
  flagEndpoint: string,
  websocketEndpoint: URL,
  initialFlags: FlagDict
): ProgressivelySdkType {
  let flags: FlagDict = initialFlags;
  let socket: WebSocket;

  function loadFlags() {
    let response: Response;

    return fetch(flagEndpoint, { credentials: "include" })
      .then((res) => {
        response = res;
        return response.json();
      })
      .then((data) => {
        flags = { ...flags, ...data };
        return { flags, response };
      });
  }

  function onFlagUpdate(callback: (data: FlagDict) => void) {
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("progressively-id="))
      ?.split("=")[1];

    if (cookieValue) websocketEndpoint.searchParams.set("id", cookieValue);

    socket = new WebSocket(websocketEndpoint.toString());
    socket.onmessage = (event) => {
      flags = { ...flags, ...JSON.parse(event.data).data };

      callback(flags);
    };
  }

  function disconnect() {
    socket?.close();
  }

  return { loadFlags, disconnect, onFlagUpdate };
}

export default { init };

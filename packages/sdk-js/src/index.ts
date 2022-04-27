import { Fields, FlagDict, ProgressivelySdkType, SDKOptions } from "./types";

export * from "./types";

function appendFieldToUrl(url: URL, fields: Fields) {
  for (const field in fields) {
    url.searchParams.set(field, String(fields[field]));
  }
}

function init(clientKey: string, options?: SDKOptions): ProgressivelySdkType {
  const fields: Fields = options?.fields || {};

  const apiRoot = options?.apiUrl || "http://localhost:4000";
  const flagEndpoint = new URL(`${apiRoot}/flags/sdk/${clientKey}`);
  appendFieldToUrl(flagEndpoint, fields);

  // Websocket specific
  const websocketRoot = options?.websocketUrl || "ws://localhost:4001";
  const websocketUrl = new URL(websocketRoot);
  websocketUrl.searchParams.set("client_key", clientKey);
  appendFieldToUrl(websocketUrl, fields);

  return Sdk(flagEndpoint.toString(), websocketUrl);
}

function Sdk(
  flagEndpoint: string,
  websocketEndpoint: URL
): ProgressivelySdkType {
  let flags: FlagDict = {};
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

    if (cookieValue) {
      websocketEndpoint.searchParams.set("id", cookieValue);
    }

    socket = new WebSocket(websocketEndpoint.toString());
    socket.onmessage = (event) => {
      const { data } = JSON.parse(event.data);
      flags = { ...flags, ...data };

      callback(flags);
    };
  }

  function disconnect() {
    socket?.close();
  }

  return { loadFlags, disconnect, onFlagUpdate };
}

export default { init };

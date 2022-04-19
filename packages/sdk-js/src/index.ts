import { Fields, FlagDict, RolloutSdkType, SDKOptions } from "./types";

export * from "./types";

function appendFieldToUrl(url: URL, fields: Fields) {
  for (const field in fields) {
    url.searchParams.set(field, String(fields[field]));
  }

  return url.toString();
}

function init(clientKey: string, options?: SDKOptions): RolloutSdkType {
  const fields: Fields = options?.fields || {};

  const apiRoot = options?.apiUrl || "http://localhost:4000";
  const flagEndpoint = appendFieldToUrl(
    new URL(`${apiRoot}/flags/sdk/${clientKey}`),
    fields
  );

  const websocketRoot = options?.websocketUrl || "ws://localhost:4001";
  const websocketUrl = new URL(websocketRoot);
  websocketUrl.searchParams.set("client_key", clientKey);
  const websocketEndpoint = appendFieldToUrl(websocketUrl, fields);

  return Sdk(flagEndpoint, websocketEndpoint);
}

function Sdk(flagEndpoint: string, websocketEndpoint: string): RolloutSdkType {
  let flags: FlagDict = {};
  let socket: WebSocket;

  function loadFlags() {
    return fetch(flagEndpoint)
      .then((response) => response.json())
      .then((data) => {
        flags = { ...flags, ...data };
        return flags;
      });
  }

  function onFlagUpdate(callback: (data: FlagDict) => void) {
    socket = new WebSocket(websocketEndpoint);

    socket.onmessage = (event) => {
      const serverMsg = JSON.parse(event.data || {});
      const { data } = serverMsg;

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

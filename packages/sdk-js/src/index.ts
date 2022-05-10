import { Fields, FlagDict, ProgressivelySdkType, SDKOptions } from "./types";

export * from "./types";

function init(clientKey: string, options?: SDKOptions): ProgressivelySdkType {
  const fields: Fields = options?.fields || {};

  // HTTP specific
  const apiRoot = options?.apiUrl || "http://localhost:4000";
  const httpOptions = Object.keys(fields)
    .map((key) => key + "=" + fields[key])
    .join("&");

  const flagEndpoint = `${apiRoot}/sdk/${clientKey}${
    httpOptions ? `?${httpOptions}` : ""
  }`;

  // Websocket specific
  const websocketRoot = options?.websocketUrl || "ws://localhost:4001";
  const wsOptions = Object.keys(fields)
    .filter((key) => key !== "id")
    .map((key) => key + "=" + fields[key])
    .join("&");

  const websocketUrl = `${websocketRoot}?client_key=${clientKey}${
    wsOptions ? `&${wsOptions}` : ""
  }`;

  return Sdk(flagEndpoint, websocketUrl, options?.initialFlags || {});
}

function Sdk(
  flagEndpoint: string,
  websocketEndpoint: string,
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

  function onFlagUpdate(
    callback: (data: FlagDict) => void,
    userId?: string | null
  ) {
    socket = new WebSocket(
      userId ? `${websocketEndpoint}&id=${userId}` : websocketEndpoint
    );

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

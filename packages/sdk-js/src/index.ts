import { Fields, FlagDict, ProgressivelySdkType, SDKOptions } from "./types";

export * from "./types";

function bToA(obj: object) {
  const value = JSON.stringify(obj);

  return typeof window === "undefined"
    ? Buffer.from(value).toString("base64")
    : btoa(value);
}

function init(clientKey: string, options?: SDKOptions): ProgressivelySdkType {
  const fields: Fields = options?.fields || {};
  fields.clientKey = clientKey;

  return Sdk(
    options?.apiUrl || "http://localhost:4000",
    options?.websocketUrl || "ws://localhost:4001",
    fields,
    options?.initialFlags || {}
  );
}

function Sdk(
  apiRoot: string,
  wsRoot: string,
  fields: Fields,
  initialFlags: FlagDict
): ProgressivelySdkType {
  let flags: FlagDict = initialFlags;
  let socket: WebSocket;

  function loadFlags() {
    let response: Response;

    return fetch(`${apiRoot}/sdk/${bToA(fields)}`, {
      credentials: "include",
    })
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
    // Mutating is okay, load has been done before hands
    if (userId) fields.id = userId;

    socket = new WebSocket(`${wsRoot}?opts=${bToA(fields)}`);

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

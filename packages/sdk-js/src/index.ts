import {
  Fields,
  FlagDict,
  LoadFlagsArgs,
  ProgressivelySdkType,
  SDKOptions,
} from "./types";

export * from "./types";

function init(clientKey: string, options?: SDKOptions): ProgressivelySdkType {
  const fields: Fields = options?.fields || {};
  fields.clientKey = clientKey;

  return Sdk(
    options?.apiUrl || "https://api.progressively.app",
    options?.websocketUrl || "wss://api.progressively.app",
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

  function loadFlags(args?: LoadFlagsArgs) {
    let response: Response;

    const toBase64 = args?.btoAFn || btoa;

    return fetch(`${apiRoot}/sdk/${toBase64(JSON.stringify(fields))}`, {
      credentials: "include",
      signal: args?.ctrl?.signal,
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

    socket = new WebSocket(`${wsRoot}?opts=${btoa(JSON.stringify(fields))}`);

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

export const Progressively = { init };

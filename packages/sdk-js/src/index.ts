import {
  Fields,
  FlagDict,
  LoadFlagsArgs,
  ProgressivelySdkType,
  SDKOptions,
} from "./types";

export * from "./types";

const isSSR = typeof window === undefined;
const LocalStorageKey = "p-flags";

function persistLocalFlags(flags: FlagDict) {
  if (!isSSR) {
    window.localStorage.setItem(LocalStorageKey, JSON.stringify(flags));
  }
}

function init(clientKey: string, options?: SDKOptions): ProgressivelySdkType {
  const fields: Fields = options?.fields || {};
  fields.clientKey = clientKey;

  let resolvedFlags: FlagDict = {};

  if (options?.initialFlags) {
    resolvedFlags = options.initialFlags;
  } else if (!isSSR) {
    try {
      const stringFlags = window.localStorage.getItem(LocalStorageKey);
      resolvedFlags = stringFlags ? JSON.parse(stringFlags) : {};
    } catch {}
  }

  return Sdk(
    options?.apiUrl || "https://api.progressively.app",
    options?.websocketUrl || "wss://api.progressively.app",
    fields,
    resolvedFlags
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

        if (!res.ok) return {};

        return response.json();
      })
      .then((data) => {
        flags = { ...flags, ...data };

        persistLocalFlags(flags);

        return { flags, response };
      })
      .catch(() => {
        // Silent catch the error, and return the actual in-memory flags
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

      persistLocalFlags(flags);

      callback(flags);
    };
  }

  function disconnect() {
    socket?.close();
  }

  function track(eventName: string, data?: any) {
    return fetch(`${apiRoot}/sdk/${btoa(JSON.stringify(fields))}`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        name: eventName,
        data,
      }),
      headers: { "Content-Type": "application/json" },
    });
  }

  return { loadFlags, disconnect, onFlagUpdate, track };
}

export const Progressively = { init };

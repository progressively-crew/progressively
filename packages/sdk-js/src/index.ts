import {
  Fields,
  FlagDict,
  LoadFlagsArgs,
  ProgressivelySdkType,
  SDKOptions,
} from "./types";

export * from "./types";

const LocalStorageKey = "p-flags";

function persistLocalFlags(flags: FlagDict) {
  window.localStorage.setItem(LocalStorageKey, JSON.stringify(flags));
}

function init(clientKey: string, options: SDKOptions): ProgressivelySdkType {
  const fields: Fields = options?.fields || {};
  fields.clientKey = clientKey;

  let resolvedFlags: FlagDict = {};

  if (options?.initialFlags) {
    resolvedFlags = options.initialFlags;
  } else {
    const stringFlags = window.localStorage.getItem(LocalStorageKey);
    resolvedFlags = stringFlags ? JSON.parse(stringFlags) : {};
  }

  return Sdk(
    options.apiUrl,
    fields,
    resolvedFlags,
    options?.headers,
    options?.websocketUrl
  );
}

function Sdk(
  apiRoot: string,
  fields: Fields,
  initialFlags: FlagDict,
  headers?: RequestInit["headers"],
  wsRoot?: string
): ProgressivelySdkType {
  let flags: FlagDict = initialFlags;
  let socket: WebSocket;

  function loadFlags(args?: LoadFlagsArgs) {
    let response: Response;

    return fetch(`${apiRoot}/sdk/${btoa(JSON.stringify(fields))}`, {
      credentials: "include",
      signal: args?.ctrl?.signal,
      headers,
    })
      .then((res) => {
        response = res;

        if (!res.ok) {
          throw new Error("Request couldn't succeed");
        }

        return response.json();
      })
      .then((data) => {
        const userId = response?.headers?.get("X-progressively-id") || "";
        flags = { ...flags, ...data };

        persistLocalFlags(flags);

        return { flags, response, userId };
      })
      .catch((error) => {
        // Silent catch the error, and return the actual in-memory flags
        return { flags, response, error, userId: "" };
      });
  }

  function onFlagUpdate(
    callback: (data: FlagDict) => void,
    userId?: string | null
  ) {
    if (!wsRoot) return;
    // Mutating is okay, load has been done before hands
    if (userId) fields.id = userId;

    socket = new WebSocket(`${wsRoot}?opts=${btoa(JSON.stringify(fields))}`);

    socket.onmessage = (event) => {
      flags = { ...flags, ...JSON.parse(event.data).data };

      persistLocalFlags(flags);

      callback(flags);
    };
  }

  function track(eventName: string) {
    return fetch(`${apiRoot}/sdk/${btoa(JSON.stringify(fields))}`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        name: eventName,
      }),
      headers: { "Content-Type": "application/json" },
    }).then(() => undefined);
  }

  return { loadFlags, onFlagUpdate, track };
}

export const Progressively = { init };

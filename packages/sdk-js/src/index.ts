import { Fields, FlagDict } from "@progressively/types";
import { LoadFlagsArgs, ProgressivelySdkType, SDKOptions } from "./types";

export * from "./types";

const LocalStorageKey = "p-flags";

function persistLocalFlags(flags: FlagDict) {
  window.localStorage.setItem(LocalStorageKey, JSON.stringify(flags));
}

function init(clientKey: string, options?: SDKOptions): ProgressivelySdkType {
  let fields: Fields = options?.fields || {};
  fields.clientKey = clientKey;

  let flags: FlagDict =
    options?.flags ||
    JSON.parse(window.localStorage.getItem(LocalStorageKey) || "{}");

  let socket: WebSocket;
  let _callback: (data: FlagDict) => void;

  const apiRoot = options?.apiUrl || "https://api.progressively.app";
  const wsRoot = options?.websocketUrl || "wss://api.progressively.app";

  function loadFlags(args?: LoadFlagsArgs) {
    let response: Response;

    return fetch(`${apiRoot}/sdk/${btoa(JSON.stringify(fields))}`, {
      credentials: "include",
      signal: args?.ctrl?.signal,
      headers: options?.headers,
    })
      .then((res) => {
        response = res;

        if (!res.ok) {
          throw new Error("Request couldn't succeed");
        }

        return response.json();
      })
      .then((data) => {
        const userId = response?.headers?.get("X-progressively-id");
        fields.id = userId;

        flags = { ...flags, ...data };

        persistLocalFlags(flags);

        return { flags, response, userId };
      })
      .catch((error) => {
        return { flags, response, error };
      });
  }

  function onFlagUpdate(
    callback: (data: FlagDict) => void,
    userId?: string | number | boolean | null | undefined
  ) {
    if (!wsRoot) return;
    _callback = callback;
    fields.id = userId;

    socket = new WebSocket(`${wsRoot}?opts=${btoa(JSON.stringify(fields))}`);

    socket.addEventListener("message", (event) => {
      flags = { ...flags, ...JSON.parse(event.data).data };

      persistLocalFlags(flags);

      _callback(flags);
    });
  }

  function track(eventName: string) {
    return fetch(`${apiRoot}/sdk/${btoa(JSON.stringify(fields))}`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        name: eventName,
        url: window?.location?.href,
      }),
      headers: { "Content-Type": "application/json" },
    }).then(() => undefined);
  }

  function setFields(newFields: Fields, ctrl?: AbortController) {
    disconnect();

    fields = newFields;
    fields.clientKey = clientKey;

    onFlagUpdate(_callback, fields.id);

    return loadFlags({ ctrl });
  }

  function disconnect() {
    socket?.close();
  }

  return { loadFlags, disconnect, onFlagUpdate, track, setFields, flags };
}

export const Progressively = { init };

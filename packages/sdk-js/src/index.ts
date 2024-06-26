import { Fields, FlagDict } from "@progressively/types";
import { ProgressivelySdkType, SDKOptions } from "./types";

export * from "./types";

const LocalStorageKey = "p-flags";

function persistLocalFlags(flags: FlagDict) {
  window.localStorage.setItem(LocalStorageKey, JSON.stringify(flags));
}

function init(clientKey: string, options: SDKOptions): ProgressivelySdkType {
  let fields: Fields = options?.fields || {};
  fields.clientKey = clientKey;

  let flags: FlagDict =
    options?.flags ||
    JSON.parse(window.localStorage.getItem(LocalStorageKey) || "{}");

  let socket: WebSocket;
  let _callback: (data: FlagDict) => void;

  const apiRoot = options?.apiUrl || "https://api.progressively.app";
  const wsRoot = options?.websocketUrl;

  function loadFlags() {
    let response: Response;

    return fetch(`${apiRoot}/sdk/${btoa(JSON.stringify(fields))}`, {
      credentials: "include",
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

  function setFields(newFields: Fields) {
    disconnect();

    fields = newFields;
    fields.clientKey = clientKey;

    onFlagUpdate(_callback, fields.id);

    return loadFlags();
  }

  function disconnect() {
    socket?.close();
  }

  return { loadFlags, disconnect, onFlagUpdate, setFields, flags };
}

export const Progressively = { init };

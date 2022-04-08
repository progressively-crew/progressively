import { EndPoints } from "./endpoints";
import { FlagDict, RolloutSdkType, SDKOptions } from "./types";

export * from "./types";

function init(clientKey: string, options?: SDKOptions): RolloutSdkType {
  const resolvedOptions: SDKOptions = options || { fields: {} };

  const apiUrl = resolvedOptions.apiUrl || "http://localhost:4000";
  const flagEndpoint = EndPoints.Flags(apiUrl, clientKey, resolvedOptions);

  const websocketUrl = resolvedOptions.websocketUrl || "ws://localhost:4001";
  const websocketEndpoint = EndPoints.Socket(
    websocketUrl,
    clientKey,
    resolvedOptions
  );

  return Sdk(flagEndpoint, websocketEndpoint);
}

function Sdk(flagEndpoint: string, websocketEndpoint: string): RolloutSdkType {
  let flags: FlagDict = {};
  let socket: WebSocket;

  function initSocket() {
    socket = new WebSocket(websocketEndpoint);
  }

  async function loadFlags() {
    const response = await fetch(flagEndpoint);
    const data = (await response.json()) as FlagDict;

    flags = { ...flags, ...data };

    return data;
  }

  function onFlagUpdate(callback: (data: FlagDict) => void) {
    if (!socket) {
      console.error(
        "You ve not called the initSocket method before using this one, early breaking."
      );
      return;
    }
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

  return { initSocket, loadFlags, disconnect, onFlagUpdate };
}

export default { init };

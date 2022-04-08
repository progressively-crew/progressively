import { EndPoints } from "./endpoints";
import { Fields, FlagDict, RolloutSdkType, SDKOptions } from "./types";

export * from "./types";

function init(clientKey: string, options?: SDKOptions): RolloutSdkType {
  const fields: Fields = options?.fields || {};

  const apiUrl = options?.apiUrl || "http://localhost:4000";
  const flagEndpoint = EndPoints.Flags(apiUrl, clientKey, fields);

  const websocketUrl = options?.websocketUrl || "ws://localhost:4001";
  const websocketEndpoint = EndPoints.Socket(websocketUrl, clientKey, fields);

  return Sdk(flagEndpoint, websocketEndpoint);
}

function Sdk(flagEndpoint: string, websocketEndpoint: string): RolloutSdkType {
  let flags: FlagDict = {};
  let socket: WebSocket;

  async function loadFlags() {
    const response = await fetch(flagEndpoint);
    const data = (await response.json()) as FlagDict;

    flags = { ...flags, ...data };

    return data;
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

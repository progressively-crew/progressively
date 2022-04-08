import { EndPoints } from "./endpoints";
import { FlagDict, SDKOptions } from "./types";

export * from "./types";

export default class Sdk {
  private flags: FlagDict;
  private socket?: WebSocket;

  constructor(
    private readonly flagEndpoint: string,
    private readonly websocketEndpoint: string
  ) {
    this.flags = {};
  }

  static init(clientKey: string, options?: SDKOptions) {
    const resolvedOptions: SDKOptions = options || { fields: {} };

    const apiUrl = resolvedOptions.apiUrl || "http://localhost:4000";
    const flagEndpoint = EndPoints.Flags(apiUrl, clientKey, resolvedOptions);

    const websocketUrl = resolvedOptions.websocketUrl || "ws://localhost:4001";
    const websocketEndpoint = EndPoints.Socket(
      websocketUrl,
      clientKey,
      resolvedOptions
    );

    return new Sdk(flagEndpoint, websocketEndpoint);
  }

  /**
   * This method should only be called on client side or on server
   * that have a polyfill for HTML5 WebSocket
   */
  initSocket() {
    this.socket = new WebSocket(this.websocketEndpoint);
  }

  async loadFlags() {
    const response = await fetch(this.flagEndpoint);
    const data = (await response.json()) as FlagDict;

    this.flags = { ...this.flags, ...data };

    return data;
  }

  onFlagUpdate(callback: (data: FlagDict) => void) {
    if (!this.socket) {
      console.error(
        "You ve not called the initSocket method before using this one, early breaking."
      );
      return;
    }

    this.socket.onmessage = (event) => {
      const serverMsg = JSON.parse(event.data || {});
      const { data } = serverMsg;

      this.flags = { ...this.flags, ...data };
      callback(this.flags);
    };
  }

  disconnect() {
    this.socket?.close();
  }
}

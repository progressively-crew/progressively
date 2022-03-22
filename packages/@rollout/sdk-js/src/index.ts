import { EndPoints } from "./endpoints";
import { FlagDict, SDKOptions } from "./types";

export * from "./types";

export default class Sdk {
  private flags: FlagDict;
  private socket?: WebSocket;
  constructor(
    private readonly clientKey: string,
    private readonly options: SDKOptions
  ) {
    this.flags = {};
  }

  static init(clientKey: string, options?: SDKOptions) {
    const resolvedOptions: SDKOptions = options || { fields: {} };

    if (!resolvedOptions.apiUrl) {
      resolvedOptions.apiUrl = EndPoints.Socket(clientKey);
    }

    return new Sdk(clientKey, resolvedOptions);
  }

  /**
   * This method should only be called on client side or on server
   * that have a polyfill for HTML5 WebSocket
   */
  initSocket() {
    this.socket = new WebSocket(this.options.apiUrl!);
  }

  async loadFlags() {
    const response = await fetch(EndPoints.Flags(this.clientKey, this.options));
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

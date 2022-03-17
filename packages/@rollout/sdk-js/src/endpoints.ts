import { SDKOptions } from "./types";

const backendUrl = `http://localhost:4000`;
const socketUrl = `ws://localhost:4001`;

export const EndPoints = {
  Socket: (clientKey: string) => `${socketUrl}?client_key=${clientKey}`,
  Flags: (clientKey: string, options: SDKOptions) => {
    const url = new URL(`${backendUrl}/flags/sdk/${clientKey}`);

    for (const field in options.fields) {
      url.searchParams.set(field, String(options.fields[field]));
    }

    return url.toString();
  },
};

import { SDKOptions } from "./types";

export const EndPoints = {
  Socket: (websocketUrl: string, clientKey: string, options: SDKOptions) => {
    const url = new URL(websocketUrl);

    url.searchParams.set("client_key", clientKey);

    for (const field in options.fields) {
      url.searchParams.set(field, String(options.fields[field]));
    }

    return url.toString();
  },
  Flags: (apiUrl: string, clientKey: string, options: SDKOptions) => {
    const url = new URL(`${apiUrl}/flags/sdk/${clientKey}`);

    for (const field in options.fields) {
      url.searchParams.set(field, String(options.fields[field]));
    }

    return url.toString();
  },
};

import { Fields } from "./types";

function appendFieldToUrl(url: URL, fields: Fields) {
  for (const field in fields) {
    url.searchParams.set(field, String(fields[field]));
  }

  return url.toString();
}

export const EndPoints = {
  Socket: (websocketUrl: string, clientKey: string, fields: Fields) => {
    const url = new URL(websocketUrl);
    url.searchParams.set("client_key", clientKey);

    return appendFieldToUrl(url, fields);
  },
  Flags: (apiUrl: string, clientKey: string, fields: Fields) => {
    const url = new URL(`${apiUrl}/flags/sdk/${clientKey}`);

    return appendFieldToUrl(url, fields);
  },
};

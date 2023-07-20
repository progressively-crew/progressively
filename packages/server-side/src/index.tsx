import { Fields, FlagDict } from "@progressively/types";

export { Fields, FlagDict };

export interface SDKOptions {
  fields?: Fields;
  apiUrl?: string;
  websocketUrl?: string;
  flags?: FlagDict;
  shouldHit?: boolean;
  safeValueWhenFailing?: boolean;
}

const btoA = (toTransform: string) => btoa(toTransform);

export function getProgressivelyData(clientKey: string, options?: SDKOptions) {
  const apiRoot = options?.apiUrl || "https://api.progressively.app";
  const fields: Fields = options?.fields || {};
  fields.clientKey = clientKey;

  let response: Response | undefined;
  let userId = "";
  return fetch(`${apiRoot}/sdk/${btoA(JSON.stringify(fields))}`, {
    credentials: "include",
    headers: options?.shouldHit
      ? undefined
      : {
          "X-progressively-hit": "skip",
        },
  })
    .then((res: Response) => {
      response = res;
      userId = response.headers?.get("X-progressively-id") ?? "";
      return response.json();
    })
    .then((flags: FlagDict) => {
      return {
        data: {
          flags,
          clientKey,
          ...options,
        },
        response,
        userId,
      };
    })
    .catch(() => {
      return {
        data: {
          flags: options?.safeValueWhenFailing ? {} : undefined,
          clientKey,
          ...options,
        },
        response,
        userId,
      };
    });
}

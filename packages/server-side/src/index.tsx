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

const fetchEndpoint = (url: string, fields: Fields, options?: SDKOptions) => {
  let response: Response | undefined;
  let userId = "";

  return fetch(url, {
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
          clientKey: fields.clientKey,
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
          clientKey: fields.clientKey,
          ...options,
        },
        response,
        userId,
      };
    });
};

export const Progressively = {
  init(clientKey: string, options?: SDKOptions) {
    return {
      loadFlags: () => {
        const apiRoot = options?.apiUrl || "https://api.progressively.app";
        const fields: Fields = options?.fields || {};
        fields.clientKey = clientKey;

        const url = `${apiRoot}/sdk/${btoA(JSON.stringify(fields))}`;
        return fetchEndpoint(url, fields, options);
      },
      evaluateFlag: (flagKey: string) => {
        const apiRoot = options?.apiUrl || "https://api.progressively.app";
        const fields: Fields = options?.fields || {};
        fields.clientKey = clientKey;

        const url = `${apiRoot}/sdk/${btoA(JSON.stringify(fields))}/${flagKey}`;
        return fetchEndpoint(url, fields, options);
      },
    };
  },
};

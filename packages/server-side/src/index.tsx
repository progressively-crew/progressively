import { Fields, FlagDict } from "@progressively/types";

export { Fields, FlagDict };

export interface SDKOptions {
  clientKey?: string;
  secretKey: string;
  apiUrl?: string;
  websocketUrl?: string;
  flags?: FlagDict;
  shouldHit?: boolean;
  safeValueWhenFailing?: boolean;
  fields?: Fields;
}

const btoA = (toTransform: string) => btoa(toTransform);

const fetchEndpoint = (url: string, _options: SDKOptions) => {
  const { clientKey, secretKey, shouldHit, safeValueWhenFailing, ...options } =
    _options;
  let response: Response | undefined;
  let userId = "";

  const headers: HeadersInit = shouldHit
    ? { "x-api-key": secretKey }
    : { "x-api-key": secretKey, "X-progressively-hit": "skip" };

  return fetch(url, {
    credentials: "include",
    headers,
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
          flags: safeValueWhenFailing ? {} : undefined,
          clientKey,
          ...options,
        },
        response,
        userId,
      };
    });
};

export const Progressively = {
  init(options: SDKOptions) {
    return {
      loadFlags: () => {
        const apiRoot = options.apiUrl || "https://api.progressively.app";
        const fields: Fields = options?.fields || {};

        const url = `${apiRoot}/sdk/${btoA(JSON.stringify(fields))}`;
        return fetchEndpoint(url, options);
      },
    };
  },
};

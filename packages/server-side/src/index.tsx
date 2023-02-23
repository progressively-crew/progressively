export type FlagDict = { [key: string]: boolean | string };
export type Fields = Record<
  string,
  string | number | boolean | null | undefined
>;

export interface SDKOptions {
  fields?: Fields;
  apiUrl: string;
  websocketUrl?: string;
  initialFlags?: FlagDict;
  shouldHit?: boolean;
  safeValueWhenFailing?: boolean;
}

const btoA = (toTransform: string) => btoa(toTransform);

export function getProgressivelyData(clientKey: string, options: SDKOptions) {
  const apiRoot = options.apiUrl;
  const fields: Fields = options?.fields || {};
  fields.clientKey = clientKey;

  let response: Response | undefined;
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
      return response.json();
    })
    .then((flags: FlagDict) => {
      return {
        data: {
          initialFlags: flags,
          clientKey,
          ...options,
        },
        response,
      };
    })
    .catch(() => {
      return {
        data: {
          initialFlags: options?.safeValueWhenFailing ? {} : undefined,
          clientKey,
          ...options,
        },
        response,
      };
    });
}

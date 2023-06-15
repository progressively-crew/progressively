import { Fields, FlagDict } from "@progressively/types";

const actualFetch = require("node-fetch");

export { Fields, FlagDict };

export interface SDKOptions {
  fields?: Fields;
  apiUrl?: string;
}
export interface ProgressivelySdkType {
  loadFlags: () => Promise<{ flags: FlagDict; response: Response }>;
}

const btoA = (toTransform: string) =>
  Buffer.from(toTransform).toString("base64");

function init(clientKey: string, options?: SDKOptions): ProgressivelySdkType {
  const fields: Fields = options?.fields || {};
  fields.clientKey = clientKey;

  return Sdk(options?.apiUrl || "https://api.progressively.app", fields);
}

const Sdk = (apiRoot: string, fields: Fields): ProgressivelySdkType => {
  const loadFlags = () => {
    let response: Response;

    return actualFetch(`${apiRoot}/sdk/${btoA(JSON.stringify(fields))}`, {
      credentials: "include",
    })
      .then((res: Response) => {
        response = res;
        return response.json();
      })
      .then((flags: FlagDict) => {
        return { flags, response };
      });
  };

  return {
    loadFlags,
  };
};

export const Progressively = { init };

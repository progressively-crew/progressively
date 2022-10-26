import { Progressively, SDKOptions } from "@progressively/sdk-js";

const btoA = (toTransform: string) =>
  Buffer.from(toTransform).toString("base64");

export function getProgressivelyProps(
  clientKey: string,
  options?: SDKOptions | undefined
) {
  const ssrOptions: SDKOptions = {
    headers: {
      "X-progressively-hit": "skip",
    },
    ...options,
  };

  const sdk = Progressively.init(clientKey, ssrOptions);

  return sdk.loadFlags({ btoAFn: btoA }).then(({ flags, response }) => {
    return {
      progressivelyProps: {
        initialFlags: flags,
        clientKey,

        ...options,
      },
      cookies: response.headers.get("set-cookie"),
    };
  });
}

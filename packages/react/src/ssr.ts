import ProgressivelySdk, { SDKOptions } from "@progressively/sdk-js";

const btoA = (toTransform: string) =>
  Buffer.from(toTransform).toString("base64");

export function getSSRProps(
  clientKey: string,
  options?: SDKOptions | undefined
) {
  const sdk = ProgressivelySdk.init(clientKey, options);

  return sdk.loadFlags({ btoAFn: btoA }).then(({ flags, response }) => {
    return {
      ssrProps: {
        initialFlags: flags,
        clientKey,

        ...options,
      },
      cookies: response.headers.get("set-cookie"),
    };
  });
}

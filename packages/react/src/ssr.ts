import * as ProgressivelySdk from "@progressively/node";

export function getSSRProps(
  clientKey: string,
  options?: ProgressivelySdk.SDKOptions | undefined
) {
  const sdk = ProgressivelySdk.init(clientKey, options);

  return sdk.loadFlags().then(({ flags, response }) => {
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

import ProgressivelySdk, { SDKOptions } from "@progressively/sdk-js";

export function getSSRProps(
  clientKey: string,
  options?: SDKOptions | undefined
) {
  const sdk = ProgressivelySdk.init(clientKey, options);

  return sdk.loadFlags().then(({ flags, response }) => {
    return {
      ssrProps: {
        initialFlags: flags,
        clientKey,
        onlyRenderWhenReady: false,
        ...options,
      },
      cookies: response.headers.get("set-cookie"),
    };
  });
}

import ProgressivelySdk, { SDKOptions } from "@progressively/sdk-js";

export function getSSRProps(
  clientKey: string,
  options?: SDKOptions | undefined
) {
  const sdk = ProgressivelySdk.init(clientKey, options);

  return sdk.loadFlags().then((initialFlags) => ({
    initialFlags,
    clientKey,
    onlyRenderWhenReady: false,
    ...options,
  }));
}

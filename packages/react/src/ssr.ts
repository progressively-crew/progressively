import RolloutSdk, { SDKOptions } from "@rollout/sdk-js";
import { RolloutProviderProps } from "./types";

export function getSSRProps(
  clientKey: string,
  options?: SDKOptions | undefined
) {
  const sdk = RolloutSdk.init(clientKey, options);

  return sdk.loadFlags().then((initialFlags) => ({
    initialFlags,
    clientKey,
    onlyRenderWhenReady: false,
    ...options,
  }));
}

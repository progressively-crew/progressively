import RolloutSdk, { SDKOptions } from "@rollout/sdk-js";
import { RolloutProviderProps } from "./types";

export const getSSRProps = async (
  clientKey: string,
  options?: SDKOptions | undefined
) => {
  const sdk = RolloutSdk.init(clientKey, options);

  const ssrProps: RolloutProviderProps = {
    initialFlags: await sdk.loadFlags(),
    clientKey,
    onlyRenderWhenReady: false,
    ...options,
  };

  return ssrProps;
};

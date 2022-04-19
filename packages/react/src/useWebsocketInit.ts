import { useEffect } from "react";
import { FlagDict, RolloutSdkType } from "@rollout/sdk-js";

export const useWebsocketInit = (
  sdkRef: React.MutableRefObject<RolloutSdkType>,
  onFlagUpdate: (flags: FlagDict) => void
) => {
  useEffect(() => {
    if (!sdkRef.current) return;

    const sdk = sdkRef.current;
    sdk.onFlagUpdate(onFlagUpdate);

    return () => {
      sdk.disconnect();
    };
  }, []);
};

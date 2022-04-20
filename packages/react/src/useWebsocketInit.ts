import { useEffect } from "react";
import { FlagDict, ProgressivelySdkType } from "@progressively/sdk-js";

export const useWebsocketInit = (
  sdkRef: React.MutableRefObject<ProgressivelySdkType>,
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

/** For internal usage only, don't export it. For usage in application, make sure to use useFlags */

import { FlagDict, RolloutSdkType } from "@rollout/sdk-js";
import { useEffect, useState } from "react";

export const useFlagInit = (
  sdkRef: React.MutableRefObject<RolloutSdkType>,
  initialFlags?: FlagDict
) => {
  const [isLoading, setIsLoading] = useState(initialFlags ? false : true);
  const [error, setError] = useState<any>(undefined);
  const [flags, setFlags] = useState<FlagDict>(initialFlags || {});

  useEffect(
    function loadFlags() {
      // Early return the client side fetch when they are resolved on the server
      if (initialFlags) return;

      const loadFlags = async () => {
        try {
          const clientFlags = await sdkRef.current!.loadFlags();
          setFlags(clientFlags);
          setIsLoading(false);
        } catch (e) {
          setError(e);
        }
      };

      loadFlags();
    },
    [initialFlags]
  );

  return { flags, error, isLoading, setFlags };
};

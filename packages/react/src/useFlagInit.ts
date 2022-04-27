/** For internal usage only, don't export it. For usage in application, make sure to use useFlags */
import { FlagDict, ProgressivelySdkType } from "@progressively/sdk-js";
import { useEffect, useState } from "react";

export const useFlagInit = (
  sdkRef: React.MutableRefObject<ProgressivelySdkType>,
  initialFlags?: FlagDict
) => {
  const [isLoading, setIsLoading] = useState(initialFlags ? false : true);
  const [error, setError] = useState<any>(undefined);
  const [flags, setFlags] = useState<FlagDict>(initialFlags || {});

  // Only run the effect on mount, NEVER later
  useEffect(() => {
    if (!sdkRef.current) return;

    const sdk = sdkRef.current;

    // Early return the client side fetch when they are resolved on the server
    if (initialFlags) {
      sdk.onFlagUpdate(setFlags);
      return () => sdk.disconnect();
    }

    sdk
      .loadFlags()
      .then(({ flags: clientFlags }) => {
        sdk.onFlagUpdate(setFlags);
        setFlags(clientFlags);
        setIsLoading(false);
      })
      .catch(setError);

    return () => sdk?.disconnect();
  }, []);

  return { flags, error, isLoading, setFlags };
};

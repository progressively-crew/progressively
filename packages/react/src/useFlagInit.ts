/** For internal usage only, don't export it. For usage in application, make sure to use useFlags */
import { FlagDict, ProgressivelySdkType } from "@progressively/sdk-js";
import { useEffect, useState } from "react";

export const useFlagInit = (
  sdkRef: React.MutableRefObject<ProgressivelySdkType>,
  initialFlags?: FlagDict
) => {
  const [isLoading, setIsLoading] = useState(!initialFlags);
  const [error, setError] = useState<any>();
  const [flags, setFlags] = useState<FlagDict>(initialFlags || {});

  // Only run the effect on mount, NEVER later
  useEffect(() => {
    const sdk = sdkRef.current;
    if (!sdk) return;

    // Early return the client side fetch when they are resolved on the server
    if (initialFlags) {
      const cookieValue = document.cookie
        .split("; ")
        .find((row) => row.startsWith("progressively-id="))
        ?.split("=")[1];

      sdk.onFlagUpdate(setFlags, cookieValue);
      return () => sdk.disconnect();
    }

    sdk
      .loadFlags()
      .then((res) => {
        sdk.onFlagUpdate(
          setFlags,
          res.response.headers.get("X-progressively-id")
        );
        setFlags(res.flags);
        setIsLoading(false);
      })
      .catch(setError);

    return () => sdk.disconnect();
  }, []);

  return { flags, error, isLoading, setFlags };
};

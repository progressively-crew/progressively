/** For internal usage only, don't export it. For usage in application, make sure to use useFlags */
import { FlagDict, ProgressivelySdkType } from "@progressively/sdk-js";
import { useEffect, useRef, useState } from "react";

export const useFlagInit = (
  sdkRef: React.MutableRefObject<ProgressivelySdkType>,
  initialFlags?: FlagDict
) => {
  const alreadyConnected = useRef(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>();
  const [flags, setFlags] = useState<FlagDict>(initialFlags || {});

  useEffect(() => {
    // React 18 fires effects twice in strict / dev mode, this one prevent the second call
    // from connecting the socket another time and break it
    if (alreadyConnected.current) return;

    const sdk = sdkRef.current;
    const ctrl = new AbortController();

    sdk
      .loadFlags({ ctrl })
      .then((res) => {
        sdk.onFlagUpdate(
          setFlags,
          res.response.headers.get("X-progressively-id")
        );
        setFlags(res.flags);
        setIsLoading(false);
      })
      .catch(setError);

    return () => {
      if (alreadyConnected.current) {
        sdk.disconnect();
        ctrl.abort();
      } else {
        alreadyConnected.current = true;
      }
    };
  }, []);

  return { flags, error, isLoading, setFlags };
};

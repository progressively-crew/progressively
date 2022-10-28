import React, { useEffect, useRef, useState } from "react";
import { ProgressivelyContext } from "./ProgressivelyContext";
import { Progressively, ProgressivelySdkType } from "@progressively/sdk-js";
import { ProgressivelyProviderProps } from "./types";
import { FlagDict } from "@progressively/sdk-js/dist/modern";

export const ProgressivelyProvider = ({
  children,
  clientKey,
  initialFlags,
  apiUrl,
  websocketUrl,
  fields,
}: ProgressivelyProviderProps) => {
  const sdkRef = useRef<ProgressivelySdkType | undefined>();
  const alreadyConnected = useRef(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>();
  const [flags, setFlags] = useState<FlagDict>(initialFlags || {});

  useEffect(() => {
    // React 18 fires effects twice in strict / dev mode, this one prevent the second call
    // from connecting the socket another time and break it
    if (alreadyConnected.current) return;

    const sdk = Progressively.init(clientKey, {
      fields: fields || {},
      apiUrl,
      websocketUrl,
      initialFlags,
    });

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

  const track =
    sdkRef.current?.track ||
    ((eventName: string, data?: any) => Promise.resolve(new Response()));

  return (
    <ProgressivelyContext.Provider value={{ flags, isLoading, error, track }}>
      {children}
    </ProgressivelyContext.Provider>
  );
};

import React, { useState, useRef, useEffect } from "react";
import { RolloutContext } from "./RolloutContext";
import RolloutSdk from "@rollout/sdk-js";
import { FlagDict } from "@rollout/sdk-js/dist/types";
import { RolloutProviderProps } from "./types";

export const RolloutProvider: React.FC<RolloutProviderProps> = ({
  children,
  clientKey,
  initialFlags,
  onlyRenderWhenReady = true,
  apiUrl,
  websocketUrl,
  fields = {},
}) => {
  const [isLoading, setIsLoading] = useState(initialFlags ? false : true);
  const [error, setError] = useState<any>(undefined);
  const [flags, setFlags] = useState<FlagDict>(initialFlags || {});
  const sdkRef = useRef<RolloutSdk>(
    RolloutSdk.init(clientKey, { fields, apiUrl, websocketUrl })
  );

  useEffect(() => {
    sdkRef.current.initSocket();
  }, []);

  useEffect(() => {
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
  }, [initialFlags]);

  useEffect(() => {
    if (!sdkRef.current) return;

    const sdk = sdkRef.current;
    sdk.onFlagUpdate(setFlags);

    return () => {
      sdk.disconnect();
    };
  }, []);

  if (onlyRenderWhenReady && isLoading) {
    return null;
  }

  const proxy = new Proxy(flags, {
    get(flagsDict, flagKey: string) {
      if (flagsDict[flagKey]) {
        // Send a hit
      }

      return flagsDict[flagKey];
    },
  });

  const providerValue = { flags: proxy, isLoading, error };

  return (
    <RolloutContext.Provider value={providerValue}>
      {children}
    </RolloutContext.Provider>
  );
};

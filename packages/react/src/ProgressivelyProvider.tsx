import React, { useRef } from "react";
import { ProgressivelyContext } from "./ProgressivelyContext";
import ProgressivelySdk from "@progressively/sdk-js";
import { ProgressivelyProviderProps } from "./types";
import { useWebsocketInit } from "./useWebsocketInit";
import { useFlagInit } from "./useFlagInit";

export const ProgressivelyProvider = ({
  children,
  clientKey,
  initialFlags,
  onlyRenderWhenReady = true,
  apiUrl,
  websocketUrl,
  fields = {},
}: ProgressivelyProviderProps) => {
  const sdkRef = useRef(
    ProgressivelySdk.init(clientKey, { fields, apiUrl, websocketUrl })
  );

  const { flags, error, isLoading, setFlags } = useFlagInit(
    sdkRef,
    initialFlags
  );

  useWebsocketInit(sdkRef, setFlags);

  if (onlyRenderWhenReady && isLoading) {
    return null;
  }

  const providerValue = { flags, isLoading, error };

  return (
    <ProgressivelyContext.Provider value={providerValue}>
      {children}
    </ProgressivelyContext.Provider>
  );
};

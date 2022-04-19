import React, { useRef } from "react";
import { RolloutContext } from "./RolloutContext";
import RolloutSdk from "@rollout/sdk-js";
import { RolloutProviderProps } from "./types";
import { useWebsocketInit } from "./useWebsocketInit";
import { useFlagInit } from "./useFlagInit";

export const RolloutProvider = ({
  children,
  clientKey,
  initialFlags,
  onlyRenderWhenReady = true,
  apiUrl,
  websocketUrl,
  fields = {},
}: RolloutProviderProps) => {
  const sdkRef = useRef(
    RolloutSdk.init(clientKey, { fields, apiUrl, websocketUrl })
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
    <RolloutContext.Provider value={providerValue}>
      {children}
    </RolloutContext.Provider>
  );
};

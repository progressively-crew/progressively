import React, { useRef } from "react";
import { ProgressivelyContext } from "./ProgressivelyContext";
import ProgressivelySdk from "@progressively/sdk-js";
import { ProgressivelyProviderProps } from "./types";
import { useFlagInit } from "./useFlagInit";

export const ProgressivelyProvider = ({
  children,
  clientKey,
  initialFlags,
  apiUrl,
  websocketUrl,
  fields,
}: ProgressivelyProviderProps) => {
  const sdkRef = useRef(
    ProgressivelySdk.init(clientKey, {
      fields: fields || {},
      apiUrl,
      websocketUrl,
      initialFlags,
    })
  );

  const flagData = useFlagInit(sdkRef, initialFlags);

  return (
    <ProgressivelyContext.Provider value={flagData}>
      {children}
    </ProgressivelyContext.Provider>
  );
};

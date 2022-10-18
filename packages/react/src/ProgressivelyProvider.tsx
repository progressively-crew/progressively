import React, { useRef } from "react";
import { ProgressivelyContext } from "./ProgressivelyContext";
import { Progressively } from "@progressively/sdk-js";
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
    Progressively.init(clientKey, {
      fields: fields || {},
      apiUrl,
      websocketUrl,
      initialFlags,
    })
  );

  const flagData = useFlagInit(sdkRef, initialFlags);

  return (
    <ProgressivelyContext.Provider
      value={{ ...flagData, track: sdkRef.current.track }}
    >
      {children}
    </ProgressivelyContext.Provider>
  );
};

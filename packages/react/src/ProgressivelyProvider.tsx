import React, { useEffect, useState } from "react";
import { ProgressivelyContext } from "./ProgressivelyContext";
import { Progressively, ProgressivelySdkType } from "@progressively/sdk-js";
import { ProgressivelyProviderProps, StateMachineConstants } from "./types";
import { FlagDict } from "@progressively/sdk-js";

export const ProgressivelyProvider = ({
  children,
  clientKey,
  initialFlags,
  apiUrl,
  websocketUrl,
  fields,
}: ProgressivelyProviderProps) => {
  const [trackFn, setTrackFn] = useState<ProgressivelySdkType["track"]>(
    (eventName: string, data?: any) => Promise.resolve(undefined)
  );
  const [status, setStatus] = useState<StateMachineConstants>("idle");
  const [error, setError] = useState<any>();
  const [flags, setFlags] = useState<FlagDict>(initialFlags || {});

  useEffect(() => {
    const sdk = Progressively.init(clientKey, {
      fields: fields || {},
      apiUrl,
      websocketUrl,
      initialFlags,
    });

    const ctrl = new AbortController();

    setTrackFn(() => sdk.track);

    sdk.loadFlags({ ctrl }).then((res) => {
      sdk.onFlagUpdate(
        setFlags,
        res.response.headers.get("X-progressively-id")
      );
      setFlags(res.flags);

      setStatus("success");

      if (res.error) {
        setStatus("failure");
        setError(res.error);
      }
    });

    return () => {
      sdk.disconnect();
      ctrl.abort();
    };
  }, []);

  const isLoading = status === "loading";

  return (
    <ProgressivelyContext.Provider
      value={{ flags, status, isLoading, error, track: trackFn }}
    >
      {children}
    </ProgressivelyContext.Provider>
  );
};

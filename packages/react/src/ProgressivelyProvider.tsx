import React, { useEffect, useRef, useState } from "react";
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
  const alreadyConnected = useRef(false);
  const [trackFn, setTrackFn] = useState<ProgressivelySdkType["track"]>(
    (eventName: string) => Promise.resolve(undefined)
  );
  const [status, setStatus] = useState<StateMachineConstants>("idle");
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

    setTrackFn(() => sdk.track);

    sdk.loadFlags({ ctrl }).then((res) => {
      sdk.onFlagUpdate(setFlags, res.userId);
      setFlags(res.flags);

      setStatus("success");

      if (res.error) {
        setStatus("failure");
        setError(res.error);
      }
    });

    return () => {
      if (alreadyConnected.current) {
        sdk.disconnect();
        ctrl.abort();
      } else {
        alreadyConnected.current = true;
      }
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

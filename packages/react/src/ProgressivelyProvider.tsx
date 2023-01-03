import React, { useEffect, useState } from "react";
import { ProgressivelyContext } from "./ProgressivelyContext";
import { Progressively, ProgressivelySdkType } from "@progressively/sdk-js";
import { ProgressivelyProviderProps, StateMachineConstants } from "./types";
import { FlagDict } from "@progressively/sdk-js";

interface Status {
  error?: Error;
  status: StateMachineConstants;
}

export const ProgressivelyProvider = ({
  children,
  clientKey,
  initialFlags,
  apiUrl,
  websocketUrl,
  fields,
}: ProgressivelyProviderProps) => {
  const [trackFn, setTrackFn] = useState<ProgressivelySdkType["track"]>(() =>
    Promise.resolve(undefined)
  );
  const [state, setState] = useState<Status>({ status: "idle" });
  const [flags, setFlags] = useState<FlagDict>(initialFlags || {});
  const [setFields, setSetFields] = useState<ProgressivelySdkType["setFields"]>(
    () => {}
  );

  useEffect(() => {
    const sdk = Progressively.init(clientKey, {
      fields,
      apiUrl,
      websocketUrl,
      initialFlags,
    });

    const ctrl = new AbortController();

    setTrackFn(() => sdk.track);
    setSetFields(() => sdk.setFields);

    sdk.loadFlags(ctrl).then((res) => {
      sdk.onFlagUpdate(setFlags, res.userId);

      setFlags(res.flags);
      setState({ status: res.error ? "failure" : "success", error: res.error });
    });

    return () => {
      sdk.disconnect();
      ctrl.abort();
    };
  }, []);

  const isLoading = state.status === "loading";

  return (
    <ProgressivelyContext.Provider
      value={{
        flags,
        status: state.status,
        isLoading,
        error: state.error,
        track: trackFn,
        setFields,
      }}
    >
      {children}
    </ProgressivelyContext.Provider>
  );
};

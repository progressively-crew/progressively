import React, { useEffect, useState } from "react";
import { ProgressivelyContext } from "./ProgressivelyContext";
import {
  Fields,
  LoadFlagsReturnType,
  Progressively,
  ProgressivelySdkType,
} from "@progressively/sdk-js";
import {
  ProgressivelyProviderProps,
  SetFieldsType,
  StateMachineConstants,
} from "./types";
import { FlagDict } from "@progressively/sdk-js";

interface Status {
  error?: Error;
  status: StateMachineConstants;
}

export const ProgressivelyProvider = ({
  children,
  clientKey,
  flags: initialFlags,
  apiUrl,
  websocketUrl,
  fields,
}: ProgressivelyProviderProps) => {
  const [trackFn, setTrackFn] = useState<
    ProgressivelySdkType["track"] | undefined
  >();

  const [setFields, setSetFields] = useState<SetFieldsType>(() =>
    Promise.resolve(undefined)
  );
  const [state, setState] = useState<Status>({ status: "idle" });
  const [flags, setFlags] = useState<FlagDict>(initialFlags || {});

  useEffect(() => {
    const sdk = Progressively.init(clientKey, {
      fields,
      apiUrl,
      websocketUrl,
      flags: initialFlags,
    });

    const handleLoadFlag = (res: LoadFlagsReturnType) => {
      setFlags(res.flags);
      setState({ status: res.error ? "failure" : "success", error: res.error });
    };

    setTrackFn(() => sdk.track);
    setSetFields(
      () => (newFields: Fields) => sdk.setFields(newFields).then(handleLoadFlag)
    );

    sdk.loadFlags().then((res) => {
      sdk.onFlagUpdate(setFlags, res.userId);
      handleLoadFlag(res);
    });

    return () => {
      sdk.disconnect();
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
        track: trackFn || (() => Promise.resolve(undefined)),
        setFields,
      }}
    >
      {children}
    </ProgressivelyContext.Provider>
  );
};

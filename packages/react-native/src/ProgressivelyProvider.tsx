import React, { useEffect, useState } from "react";
import base64 from "base-64";
import { loadFlags } from "./loadFlags";
import { ProgressivelyContext } from "./ProgressivelyContext";

import {
  LoadFlagsReturnType,
  ProgressivelyProviderProps,
  StateMachineConstants,
} from "./types";
import { FlagDict } from "@progressively/types";

import AsyncStorage from "@react-native-async-storage/async-storage";

interface Status {
  error?: Error;
  status: StateMachineConstants;
}

const LocalStorageKey = "p-flags";

export const ProgressivelyProvider = ({
  children,
  clientKey,
  apiUrl,
  websocketUrl,
  fields,
}: ProgressivelyProviderProps) => {
  const [state, setState] = useState<Status>({ status: "idle" });
  const [flags, setFlags] = useState<FlagDict>({});

  useEffect(() => {
    const flags: FlagDict = JSON.parse(
      window.localStorage.getItem(LocalStorageKey) || "{}"
    );

    setFlags(flags);
  }, []);

  useEffect(() => {
    const base64Encoded = base64.encode(
      JSON.stringify({ ...fields, clientKey })
    );

    const persistLocalFlags = async (flags: FlagDict) => {
      await AsyncStorage.setItem(LocalStorageKey, JSON.stringify(flags));
    };

    const handleLoadFlag = (res: LoadFlagsReturnType) => {
      fields.id = res.userId;
      persistLocalFlags(res.flags);
      setFlags(res.flags);
      setState({ status: res.error ? "failure" : "success", error: res.error });
    };

    const endpoint = apiUrl || "https://api.progressively.app";
    loadFlags(endpoint, base64Encoded).then(handleLoadFlag);
  }, [apiUrl, websocketUrl, fields, clientKey]);

  const isLoading = state.status === "loading";

  return (
    <ProgressivelyContext.Provider
      value={{
        flags,
        status: state.status,
        isLoading,
        error: state.error,
      }}
    >
      {children}
    </ProgressivelyContext.Provider>
  );
};

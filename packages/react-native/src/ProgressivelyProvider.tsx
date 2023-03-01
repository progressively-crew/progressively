import React, { useEffect, useRef, useState } from "react";
import { loadFlags } from "./loadFlags";
import { ProgressivelyContext } from "./ProgressivelyContext";

import {
  FlagDict,
  LoadFlagsReturnType,
  Fields,
  StateMachineConstants,
} from "./types";

interface Status {
  error?: Error;
  status: StateMachineConstants;
}

export interface ProgressivelyProviderProps {
  clientKey: string;
  initialFlags?: FlagDict;
  fields?: Fields;
  apiUrl: string;
  websocketUrl?: string;
  children?: React.ReactNode;
}

export const ProgressivelyProvider = ({
  children,
  clientKey,
  initialFlags,
  apiUrl,
  websocketUrl,
  fields,
}: ProgressivelyProviderProps) => {
  const [state, setState] = useState<Status>({ status: "idle" });
  const [flags, setFlags] = useState<FlagDict>(initialFlags || {});

  useEffect(() => {
    const sdkParams =
      "eyJlbWFpbCI6Im1hcnZpbi5mcmFjaGV0QHNvbWV0aGluZy5jb20iLCJpZCI6IjEiLCJjbGllbnRLZXkiOiJ2YWxpZC1zZGsta2V5In0=";

    let ws: WebSocket;
    const ctrl = new AbortController();

    const handleLoadFlag = (res: LoadFlagsReturnType) => {
      setFlags(res.flags);
      setState({ status: res.error ? "failure" : "success", error: res.error });
    };

    const handleWsConnect = (userId: string | null | undefined) => {
      const nextFields = { ...fields, id: userId };

      ws = new WebSocket(`${websocketUrl}?opts=${sdkParams}`);
    };

    loadFlags(apiUrl, sdkParams, ctrl).then((res) => {
      handleWsConnect(res.userId);
      handleLoadFlag(res);
    });

    return () => {
      ws?.close();
      ctrl.abort();
    };
  }, [apiUrl, websocketUrl]);

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

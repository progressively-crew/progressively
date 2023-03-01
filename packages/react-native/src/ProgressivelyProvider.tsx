import React, { useEffect, useState } from "react";
import base64 from "base-64";
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
  fields = {},
}: ProgressivelyProviderProps) => {
  const [state, setState] = useState<Status>({ status: "idle" });
  const [flags, setFlags] = useState<FlagDict>(initialFlags || {});

  useEffect(() => {
    fields.clientKey = clientKey;
    const sdkParams = base64.encode(JSON.stringify(fields));

    let ws: WebSocket;
    const ctrl = new AbortController();

    const handleLoadFlag = (res: LoadFlagsReturnType) => {
      setFlags(res.flags);
      setState({ status: res.error ? "failure" : "success", error: res.error });
    };

    const handleWsConnect = (userId: string | null | undefined) => {
      const nextFields = { ...fields, id: userId };

      ws = new WebSocket(
        `${websocketUrl}?opts=${base64.encode(JSON.stringify(nextFields))}`
      );

      ws.onmessage = (event) => {
        setFlags((s) => ({ ...s, ...JSON.parse(event.data).data }));
      };
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

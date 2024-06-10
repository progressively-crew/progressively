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
  fields?: Fields;
  apiUrl?: string;
  websocketUrl?: string;
  children?: React.ReactNode;
}

export const ProgressivelyProvider = ({
  children,
  clientKey,
  apiUrl,
  websocketUrl,
  fields: initialFields = {},
}: ProgressivelyProviderProps) => {
  const [fields] = useState({ ...initialFields, clientKey });
  const [state, setState] = useState<Status>({ status: "idle" });
  const [flags, setFlags] = useState<FlagDict>({});

  useEffect(() => {
    const sdkParams = base64.encode(JSON.stringify(fields));

    let ws: WebSocket;

    const handleLoadFlag = (res: LoadFlagsReturnType) => {
      setFlags(res.flags);
      setState({ status: res.error ? "failure" : "success", error: res.error });
    };

    const handleWsConnect = (userId: string | null | undefined) => {
      if (!websocketUrl) return;

      const wsFields = { ...fields, id: userId };

      ws = new WebSocket(
        `${websocketUrl}?opts=${base64.encode(JSON.stringify(wsFields))}`
      );

      ws.onmessage = (event) => {
        setFlags((s) => ({ ...s, ...JSON.parse(event.data).data }));
      };
    };

    const endpoint = apiUrl || "https://api.progressively.app";
    loadFlags(endpoint, sdkParams).then((res) => {
      handleWsConnect(res.userId);
      handleLoadFlag(res);
    });

    return () => {
      ws?.close();
    };
  }, [apiUrl, websocketUrl, fields]);

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

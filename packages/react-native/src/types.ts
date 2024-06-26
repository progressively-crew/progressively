import { Fields, FlagDict } from "@progressively/types";
import React from "react";

export interface ProgressivelyProviderProps {
  clientKey: string;
  fields?: Fields;
  apiUrl?: string;
  websocketUrl?: string;
  children?: React.ReactNode;
}

export type StateMachineConstants = "idle" | "loading" | "success" | "failure";

export type SetFieldsType = (fields: Fields) => void;

export type LoadFlagsReturnType = {
  flags: FlagDict;
  response?: Response;
  error?: Error;
  userId?: string | null;
};

export { Fields, FlagDict };

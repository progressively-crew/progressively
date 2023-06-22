import { Fields, FlagDict } from "@progressively/sdk-js";
import React from "react";

export interface ProgressivelyProviderProps {
  clientKey: string;
  initialFlags?: FlagDict;
  fields?: Fields;
  apiUrl?: string;
  websocketUrl?: string;
  children?: React.ReactNode;
}

export type StateMachineConstants = "idle" | "loading" | "success" | "failure";

export type SetFieldsType = (fields: Fields) => void;

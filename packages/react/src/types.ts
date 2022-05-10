import { FlagDict } from "@progressively/sdk-js";
import React from "react";

export interface ProgressivelyProviderProps {
  clientKey: string;
  initialFlags?: FlagDict;
  fields?: Record<string, string | number | boolean>;
  apiUrl?: string;
  websocketUrl?: string;
  children?: React.ReactNode;
}

import { FlagDict } from "@rollout/sdk-js";
import React from "react";

export interface RolloutProviderProps {
  clientKey: string;
  onlyRenderWhenReady?: boolean;
  initialFlags?: FlagDict;
  fields?: Record<string, string | number | boolean>;
  apiUrl?: string;
  websocketUrl?: string;
  children?: React.ReactNode;
}

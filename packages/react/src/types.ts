import { FlagDict } from "@rollout/sdk-js";

export interface RolloutProviderProps {
  clientKey: string;
  onlyRenderWhenReady?: boolean;
  initialFlags?: FlagDict;
  fields?: Record<string, string | number | boolean>;
  apiUrl?: string;
  websocketUrl?: string;
}

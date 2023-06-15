import { Fields, FlagDict } from "@progressively/types";

export { Fields, FlagDict };
export interface SDKOptions {
  fields?: Fields;
  apiUrl?: string;
  websocketUrl?: string;
  initialFlags?: FlagDict;
  headers?: RequestInit["headers"];
}

export type LoadFlagsReturnType = {
  flags: FlagDict;
  response?: Response;
  error?: Error;
  userId?: string | null;
};

export interface ProgressivelySdkType {
  loadFlags: (args?: LoadFlagsArgs) => Promise<LoadFlagsReturnType>;
  disconnect: () => void;
  onFlagUpdate: (
    callback: (data: FlagDict) => void,
    userId?: string | null
  ) => void;
  track: (eventName: string) => Promise<void>;
  setFields: (
    newFields: Fields,
    ctrl?: AbortController
  ) => Promise<LoadFlagsReturnType>;
  flags: FlagDict;
}

export interface LoadFlagsArgs {
  ctrl?: AbortController;
}

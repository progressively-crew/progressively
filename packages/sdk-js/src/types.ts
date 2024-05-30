import { Fields, FlagDict } from "@progressively/types";

export { Fields, FlagDict };
export interface SDKOptions {
  fields?: Fields;
  apiUrl: string;
  websocketUrl?: string;
  flags?: FlagDict;
  headers?: RequestInit["headers"];
}

export type LoadFlagsReturnType = {
  flags: FlagDict;
  response?: Response;
  error?: Error;
  userId?: string | null;
};

export interface ProgressivelySdkType {
  loadFlags: () => Promise<LoadFlagsReturnType>;
  disconnect: () => void;
  onFlagUpdate: (
    callback: (data: FlagDict) => void,
    userId?: string | null
  ) => void;
  setFields: (
    newFields: Fields,
    ctrl?: AbortController
  ) => Promise<LoadFlagsReturnType>;
  flags: FlagDict;
}

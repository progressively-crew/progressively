export type FlagDict = { [key: string]: boolean | string };

export type Fields = Record<
  string,
  string | number | boolean | null | undefined
>;
export interface SDKOptions {
  fields?: Fields;
  apiUrl: string;
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
}

export interface LoadFlagsArgs {
  ctrl?: AbortController;
}

export type BtoaFn = (str: string) => string;

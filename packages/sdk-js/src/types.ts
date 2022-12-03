export type FlagDict = { [key: string]: boolean | string };

export type Fields = Record<string, string | number | boolean>;
export interface SDKOptions {
  fields?: Fields;
  apiUrl?: string;
  websocketUrl?: string;
  initialFlags?: FlagDict;
  headers?: RequestInit["headers"];
}

export interface ProgressivelySdkType {
  loadFlags: (
    args?: LoadFlagsArgs
  ) => Promise<{ flags: FlagDict; response: Response; error?: string }>;
  disconnect: () => void;
  onFlagUpdate: (
    callback: (data: FlagDict) => void,
    userId?: string | null
  ) => void;
  track: (eventName: string, data?: any) => Promise<void>;
}

export interface LoadFlagsArgs {
  ctrl?: AbortController;
}

export type BtoaFn = (str: string) => string;

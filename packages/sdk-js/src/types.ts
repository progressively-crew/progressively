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

export interface ProgressivelySdkType {
  loadFlags: (ctrl?: AbortController) => Promise<{
    flags: FlagDict;
    response?: Response;
    error?: Error;
    userId?: string | null;
  }>;
  disconnect: () => void;
  onFlagUpdate: (
    callback: (data: FlagDict) => void,
    userId?: string | null
  ) => void;
  track: (eventName: string) => Promise<void>;
  setFields: (fields: Fields) => void;
}

export type BtoaFn = (str: string) => string;

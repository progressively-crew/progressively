export type FlagDict = { [key: string]: boolean };

export type Fields = Record<string, string | number | boolean>;
export interface SDKOptions {
  fields?: Fields;
  apiUrl?: string;
  websocketUrl?: string;
  initialFlags?: FlagDict;
}

export interface ProgressivelySdkType {
  loadFlags: () => Promise<{ flags: FlagDict; response: Response }>;
  disconnect: () => void;
  onFlagUpdate: (
    callback: (data: FlagDict) => void,
    userId?: string | null
  ) => void;
}

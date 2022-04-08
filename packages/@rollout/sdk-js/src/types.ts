export type FlagDict = { [key: string]: boolean };
export interface SDKOptions {
  fields: Record<string, string | number | boolean>;
  apiUrl?: string;
  websocketUrl?: string;
}

export interface RolloutSdkType {
  initSocket: () => void;
  loadFlags: () => Promise<FlagDict>;
  disconnect: () => void;
  onFlagUpdate: (callback: (data: FlagDict) => void) => void;
}

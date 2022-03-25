export type FlagDict = { [key: string]: boolean };
export interface SDKOptions {
  fields: Record<string, string | number | boolean>;
  apiUrl?: string;
  websocketUrl?: string;
}

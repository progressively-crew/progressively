export type FlagDict = {
  [key: string]: boolean | string;
};
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

export type StateMachineConstants = "idle" | "loading" | "success" | "failure";

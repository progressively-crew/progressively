import { Fields, FlagDict } from "@progressively/types";

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

export type StateMachineConstants = "idle" | "loading" | "success" | "failure";

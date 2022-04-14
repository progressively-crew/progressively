import { Environment } from "../environments/types";

export enum FlagStatus {
  ACTIVATED = "ACTIVATED",
  NOT_ACTIVATED = "NOT_ACTIVATED",
  INACTIVE = "INACTIVE",
}

export interface Flag {
  createdAt: string;
  description: string;
  key: string;
  name: string;
  uuid: string;
}

export interface FlagEnv {
  flagId: string;
  environmentId: string;
  status: FlagStatus;
  flag: Flag;
  environment: Environment;
}

export interface CreateFlagDTO {
  description?: string;
  name?: string;
}

import { Environment } from "../environments/types";
import { Variant } from "../variants/types";

export enum FlagStatus {
  ACTIVATED = "ACTIVATED",
  NOT_ACTIVATED = "NOT_ACTIVATED",
  INACTIVE = "INACTIVE",
}

export enum FlagType {
  RELEASE = "RELEASE",
  EXPERIMENT = "EXPERIMENT",
  PERMISSION = "PERMISSION",
  KILL_SWITCH = "KILL_SWITCH",
}

export interface Flag {
  createdAt: string;
  description: string;
  key: string;
  name: string;
  uuid: string;
  type: FlagType;
}

export interface FlagEnv {
  flagId: string;
  environmentId: string;
  status: FlagStatus;
  flag: Flag;
  environment: Environment;
  rolloutPercentage: number;
  variants: Array<Variant>;
}

export interface CreateFlagDTO {
  description?: string;
  name?: string;
  type?: FlagType;
}

export interface Metric {
  uuid: string;
  name: string;
  variant?: Variant;
}

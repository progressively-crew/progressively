import { Variant } from "../variants/types";

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
  status: FlagStatus;
}

export interface FlagWithVariant {
  createdAt: string;
  description: string;
  key: string;
  name: string;
  uuid: string;
  status: FlagStatus;
  variants: Array<Variant>;
}

export interface CreateFlagDTO {
  description?: string;
  name?: string;
}

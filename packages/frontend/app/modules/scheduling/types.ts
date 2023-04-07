import { FlagStatus } from "../flags/types";

export enum SchedulingStatus {
  NOT_RUN = "NOT_RUN",
  HAS_RUN = "HAS_RUN",
}

export type Schedule = {
  utc: string;
  data: any;
  status: FlagStatus;
  uuid: string;
  schedulingStatus: SchedulingStatus;
  type: SchedulingType.UpdatePercentage;
};

export interface SchedulingUpdateVariantEntry {
  variantId: string;
  variantNewPercentage: number;
}

export interface SchedulingUpdatePercentageData {
  rolloutPercentage: number;
}

export type SchedulingCreateDTO = {
  utc: string;
  status: FlagStatus;
  data: any;
  type: string;
};
export enum SchedulingType {
  UpdatePercentage = "UpdatePercentage",
}

export const SchedulingTypes = [SchedulingType.UpdatePercentage];

import { FlagStatus } from "../flags/types";

export enum SchedulingStatus {
  NOT_RUN = "NOT_RUN",
  HAS_RUN = "HAS_RUN",
}

export interface Schedule {
  utc: string;
  data: { rolloutPercentage?: number };
  status: FlagStatus;
  uuid: string;
  schedulingStatus: SchedulingStatus;
  type: SchedulingType;
}

export interface SchedulingCreateDTO {
  utc: string;
  data: { rolloutPercentage?: number };
  status: FlagStatus;
  type: SchedulingType;
}

export enum SchedulingType {
  UpdatePercentage = "UpdatePercentage",
  UpdateVariantPercentage = "UpdateVariantPercentage",
}

export const SchedulingTypes = [
  SchedulingType.UpdatePercentage,
  SchedulingType.UpdateVariantPercentage,
];

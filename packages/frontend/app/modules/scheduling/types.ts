import { FlagStatus } from "../flags/types";

export enum SchedulingStatus {
  NOT_RUN = "NOT_RUN",
  HAS_RUN = "HAS_RUN",
}

export interface Schedule {
  utc: string;
  rolloutPercentage: number;
  status: FlagStatus;
  uuid: string;
  schedulingStatus: SchedulingStatus;
}

export interface SchedulingCreateDTO {
  utc: string;
  rolloutPercentage: number;
  status: FlagStatus;
}

export enum SchedulingAction {
  UpdateRolloutPercentage = "UpdateRolloutPercentage",
  UpdateVariant = "UpdateVariant",
}

import { FlagStatus } from "../flags/types";

export enum SchedulingStatus {
  NOT_RUN = "NOT_RUN",
  HAS_RUN = "HAS_RUN",
}

export interface Schedule {
  timestamp: number;
  rolloutPercentage: number;
  status: FlagStatus;
  uuid: string;
  schedulingStatus: SchedulingStatus;
}

export interface SchedulingCreateDTO {
  timestamp: number;
  rolloutPercentage: number;
  status: FlagStatus;
}

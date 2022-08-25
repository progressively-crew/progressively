import { FlagStatus } from "../flags/types";

export interface Schedule {
  timestamp: number;
  rolloutPercentage: number;
  status: FlagStatus;
  uuid: string;
}

export interface SchedulingCreateDTO {
  timestamp: number;
  rolloutPercentage: number;
  status: FlagStatus;
}

import { FlagStatus } from '../flags/flags.status';

export interface SchedulingCreationDTO {
  timestamp: number;
  rolloutPercentage: number;
  status: FlagStatus;
}

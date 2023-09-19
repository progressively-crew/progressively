import { Environment } from '../environments/types';
import { FlagStatus } from './flags.status';
import { Strategy } from '@progressively/database';
import { RuleType } from '../rule/types';

export interface Flag {
  uuid: string;
  name: string;
  key: string;
  description: string;
  createdAt: Date;
}

export interface FlagEnvironment {
  flagId: string;
  environmentId: string;
  status: string;
  variants: Array<Variant>;
}

interface Schedule {
  uuid: string;
  utc: string;
  rolloutPercentage: number;
  status: FlagStatus;
  schedulingStatus: SchedulingStatus;
}

export interface PopulatedVariant {
  rolloutPercentage: number;
  variantUuid: string;
  strategyUuid: string;
  variant: {
    uuid: string;
    isControl: boolean;
    value: string;
    flagEnvironmentFlagId: string;
    flagEnvironmentEnvironmentId: string;
  };
}
export interface PopulatedStrategy extends Strategy {
  variants: Array<PopulatedVariant>;
  rules: Array<Partial<RuleType>>;
}

export interface PopulatedFlagEnv extends FlagEnvironment {
  environment: Environment;
  flag: Flag;
  scheduling: Array<Schedule>;
  strategies: Array<PopulatedStrategy>;
}

export enum SchedulingStatus {
  NOT_RUN = 'NOT_RUN',
  HAS_RUN = 'HAS_RUN',
}

export interface Variant {
  uuid: string;
  rolloutPercentage: number;
  isControl: boolean;
  value: string;
}

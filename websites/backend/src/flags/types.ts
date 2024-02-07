import { Strategy } from '@progressively/database';
import { RuleType } from '../rule/types';

export interface Flag {
  uuid: string;
  name: string;
  key: string;
  description: string;
  createdAt: Date;
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

export interface PopulatedFlag extends Flag {
  flag: Flag;
  strategies: Array<PopulatedStrategy>;
  status: string;
}

export interface Variant {
  uuid: string;
  rolloutPercentage: number;
  isControl: boolean;
  value: string;
}

export interface QueuedFlagHit {
  flagId: string;
  visitorId: string;
  valueResolved: string;
}

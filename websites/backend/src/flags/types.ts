import { Project, Strategy } from '@progressively/database';
import { RuleType } from '../rule/types';
import { WhenPredicate } from '../strategy/types';

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
  };
}
export interface PopulatedStrategy extends Omit<Strategy, 'whenPredicate'> {
  variants: Array<PopulatedVariant>;
  rules: Array<Partial<RuleType>>;
  whenPredicate: WhenPredicate;
  whenTimestamp: Date | null;
}

export interface PopulatedFlag extends Flag {
  strategies: Array<PopulatedStrategy>;
  status: string;
  variants: Array<PopulatedVariant>;
  Project: Project;
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

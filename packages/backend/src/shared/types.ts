import { FlagStatus } from '../flags/flags.status';

export interface FlagResolutionStep {
  status?: FlagStatus;
  bucketValue?: number;
  expectedRolloutPercentage?: number;
  resolvingStrategyName?: string;
  type?: 'PERCENTAGE' | 'STRATEGY' | 'VARIANT';
}

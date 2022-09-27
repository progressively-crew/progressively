import { RolloutStrategy } from '../strategy/types';

export interface FlagResolutionStep {
  type?: 'PERCENTAGE' | 'STRATEGY' | 'VARIANT' | 'UNRESOLVED';

  // For type Percentage and Variant
  bucketPercentage?: number;

  // For type: 'PERCENTAGE'
  flagPercentage?: number;
  userPercentage?: number;
  strategy?: RolloutStrategy;

  // For variant resolution;
  variantValue?: string;
}

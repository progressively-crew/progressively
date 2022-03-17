import { RolloutStrategy, FlagEnvironment, Flag } from '@prisma/client';

export interface FlagDict {
  [key: string]: boolean;
}

export enum StrategyRuleType {
  Default = 'default',
  Field = 'field',
  Pool = 'pool',
}

export enum ActivationRuleType {
  Boolean = 'boolean',
  Percentage = 'percentage',
}

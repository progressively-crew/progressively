import { ComparatorEnum } from '../shared/utils/comparators/types';

export interface FlagDict {
  [key: string]: boolean;
}

export enum StrategyRuleType {
  Default = 'default',
  Field = 'field',
  Pool = 'pool',
}

export type FieldRecord = Record<string, string | number | boolean>;

export interface RolloutStrategy {
  uuid: string;
  name: string;
  strategyRuleType: StrategyRuleType;
  fieldName?: string;
  fieldComparator?: ComparatorEnum;
  fieldValue?: string;
  flagEnvironmentFlagId?: string;
  flagEnvironmentEnvironmentId?: string;
}

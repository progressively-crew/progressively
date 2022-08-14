export interface FlagDict {
  [key: string]: boolean;
}

export enum StrategyRuleType {
  Default = 'default',
  Field = 'field',
  Pool = 'pool',
}

export type FieldRecord = Record<string, string | number | boolean>;

export enum ComparatorEnum {
  Equals = 'eq',
  NotEquals = 'neq',
  Contains = 'contains',
}

export interface RolloutStrategy {
  uuid: string;
  name: string;
  strategyRuleType: StrategyRuleType;
  fieldName?: string;
  fieldComparator?: ComparatorEnum;
  fieldValue?: string;
  rolloutPercentage: number;
  flagEnvironmentFlagId?: string;
  flagEnvironmentEnvironmentId?: string;
}

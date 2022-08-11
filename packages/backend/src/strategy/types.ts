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

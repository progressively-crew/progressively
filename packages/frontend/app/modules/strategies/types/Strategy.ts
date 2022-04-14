import { BooleanActivation, PercentageActivation } from "./activation";
import {
  DefaultStrategyRule,
  FieldStrategyRule,
  PoolStrategyRule,
} from "./StrategyRule";

export interface Strategy<T, A> {
  name: string;
  strategyRule: T;
  activation: A;
}

export type GeneralStrategy = Strategy<
  DefaultStrategyRule | FieldStrategyRule | PoolStrategyRule,
  BooleanActivation | PercentageActivation
>;

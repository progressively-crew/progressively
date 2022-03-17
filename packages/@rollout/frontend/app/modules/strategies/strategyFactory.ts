import { BooleanActivation, PercentageActivation } from "./types/activation";
import { GeneralStrategy } from "./types/Strategy";
import {
  FieldStrategyRule,
  PoolStrategyRule,
  ComparatorType,
  DefaultStrategyRule,
} from "./types/StrategyRule";

export const createStrategy = (rawStrategy: any): GeneralStrategy => {
  let strategyRule:
    | DefaultStrategyRule
    | FieldStrategyRule
    | PoolStrategyRule
    | undefined;

  let activation: BooleanActivation | PercentageActivation | undefined;

  if (rawStrategy?.strategyRule?.type === "field") {
    strategyRule = {
      type: "field",
      field: rawStrategy.strategyRule.field,
      predicate: rawStrategy.strategyRule.predicate as ComparatorType,
      acceptedValues: rawStrategy.strategyRule.acceptedValues as Array<string>,
    } as FieldStrategyRule;
  } else if (rawStrategy.strategyRule.type === "pool") {
    strategyRule = { type: "pool" } as PoolStrategyRule;
  } else if (rawStrategy.strategyRule.type === "default") {
    strategyRule = { type: "default" } as DefaultStrategyRule;
  }

  if (rawStrategy?.activation?.type === "boolean") {
    activation = { type: "boolean" } as BooleanActivation;
  } else if (rawStrategy?.activation?.type === "percentage") {
    activation = { type: "percentage" } as PercentageActivation;
  }

  if (activation && strategyRule) {
    const strategy: GeneralStrategy = {
      name: rawStrategy.name,
      strategyRule,
      activation,
    };

    return strategy;
  }

  throw new Error("The strategy does not exist");
};

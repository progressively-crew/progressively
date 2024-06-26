import { ComparatorEnum, RuleUpdateDto } from "~/modules/rules/types";
import {
  StrategyUpdateDto,
  StrategyVariant,
  TargetEntity,
  ValueToServe,
} from "../types";
import { editStrategies } from "../services/editStrategies";

const mapRawVariantToActualVariant = (rawVariant: any): StrategyVariant => {
  return {
    variantUuid: rawVariant.uuid,
    rolloutPercentage: Number(rawVariant.variantRolloutPercentage),
  };
};

const isValidRule = (rule: RuleUpdateDto) => {
  return (
    (rule.fieldName && rule.fieldComparator && rule.fieldValue) ||
    rule.segmentUuid
  );
};

const mapRawRuleToActualRule = (rawRule: any): RuleUpdateDto => {
  const targetEntity = rawRule["target-entity"] as TargetEntity;

  if (targetEntity === TargetEntity.Segment && rawRule.segmentUuid) {
    return {
      segmentUuid: rawRule.segmentUuid,
    };
  }

  return {
    fieldName: rawRule["field-name"],
    fieldComparator:
      rawRule["field-comparator"] === ComparatorEnum.Contains
        ? ComparatorEnum.Contains
        : ComparatorEnum.Equals,
    fieldValue: rawRule["field-value"],
  };
};

const mapRawStrategyToActualStrategy = (
  rawStrategy: any
): StrategyUpdateDto => {
  const rawRules = rawStrategy.rules || [];
  const rules: Array<RuleUpdateDto> = rawRules
    .map((rawRule: any) => mapRawRuleToActualRule(rawRule))
    .filter((rule: RuleUpdateDto) => isValidRule(rule));

  const variants: Array<StrategyVariant> = (rawStrategy.variants || []).map(
    (variant: any) => mapRawVariantToActualVariant(variant)
  );

  return {
    rolloutPercentage: rawStrategy.rolloutPercentage
      ? Number(rawStrategy.rolloutPercentage)
      : 0,
    valueToServeType:
      rawStrategy["value-to-serve-type"] === ValueToServe.Variant
        ? ValueToServe.Variant
        : ValueToServe.Boolean,
    valueToServe: rawStrategy["value-to-serve"],
    variants,
    rules,
    whenPredicate: rawStrategy.whenPredicate,
    whenTimestamp: rawStrategy.whenTimestamp || undefined,
  };
};

export const editStrategyAction = async (
  flagId: string,
  formObject: any,
  authCookie: string
) => {
  const rawStrategies = formObject?.strategies || [];
  const strategiesToUpdate: Array<StrategyUpdateDto> = rawStrategies.map(
    (rawStrat: any) => mapRawStrategyToActualStrategy(rawStrat)
  );

  try {
    await editStrategies(flagId, strategiesToUpdate, authCookie);

    return {
      successStrategyEdited: true,
    };
  } catch (error: unknown) {
    return {
      errors: {
        message: (error as Error).message,
      },
    };
  }
};

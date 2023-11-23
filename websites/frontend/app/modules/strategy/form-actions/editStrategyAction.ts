import { ComparatorEnum, RuleUpdateDto } from "~/modules/rules/types";
import { StrategyUpdateDto, StrategyVariant, ValueToServe } from "../types";
import { editStrategy } from "../services/editStrategy";

const mapRawVariantToActualVariant = (rawVariant: any): StrategyVariant => {
  return {
    variantUuid: rawVariant.uuid,
    rolloutPercentage: Number(rawVariant.variantRolloutPercentage),
  };
};

const isValidRule = (rule: RuleUpdateDto) => {
  if (rule.segmentUuid) return true;

  return rule.fieldName && rule.fieldComparator && rule.fieldValue;
};

const mapRawRuleToActualRule = (rawRule: any): RuleUpdateDto => {
  return {
    fieldName: rawRule["field-name"],
    fieldComparator:
      rawRule["field-comparator"] === ComparatorEnum.Contains
        ? ComparatorEnum.Contains
        : ComparatorEnum.Equals,
    fieldValue: rawRule["field-value"],
    segmentUuid: rawRule["segmentUuid"],
  };
};

const mapRawStrategyToActualStrategy = (
  rawStrategy: any
): StrategyUpdateDto => {
  const rules: Array<RuleUpdateDto> = rawStrategy.rules
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
    variants,
    rules,
  };
};

export const editStrategyAction = async (
  formObject: any,
  authCookie: string
) => {
  const rawStrategies = formObject?.strategies || [];

  const strategiesToUpdate: Array<StrategyUpdateDto> = rawStrategies.map(
    (rawStrat: any) => mapRawStrategyToActualStrategy(rawStrat)
  );

  try {
    await editStrategies(strategiesToUpdate, authCookie);

    return {
      successStrategyEdited: true,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        errors: {
          message: error.message,
        },
      };
    }
  }

  console.log("yooo", JSON.stringify(strategiesToUpdate, null, 10));
};

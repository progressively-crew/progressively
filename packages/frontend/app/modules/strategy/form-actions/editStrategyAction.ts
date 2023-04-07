/* eslint-disable sonarjs/cognitive-complexity */
import { updateRule } from "~/modules/rules/services/updateRule";
import { ComparatorEnum, Rule } from "~/modules/rules/types";
import { editStrategy } from "../services/editStrategy";
import { StrategyVariant, ValueToServe } from "../types";

/* eslint-disable unicorn/no-array-for-each */
export const editStrategyAction = async (
  formData: FormData,
  strategyId: string,
  authCookie: string
) => {
  const rolloutPercentage = formData.get("rolloutPercentage")?.toString() || "";
  const valueToServeType =
    formData.get("value-to-serve-type")?.toString() || "";
  const valueToServe = formData.get("value-to-serve")?.toString();
  const allVariantUuids = formData.getAll("variantUuid");
  const allVariantPercentage = formData.getAll("variantRolloutPercentage");

  const allIds = formData.getAll("ruleUuid");
  const allFieldName = formData.getAll("field-name");
  const allComparators = formData.getAll("field-comparator");
  const allFieldValue = formData.getAll("field-value");

  const toUpdate: Array<Rule> = [];
  const entries = allIds.entries();
  let hasError = false;

  for (const [i, uuid] of entries) {
    const fieldName = allFieldName[i]?.toString() || "";
    const fieldComparator = allComparators[i]?.toString() || "";
    const fieldValue = allFieldValue[i]?.toString() || "";

    if (uuid && fieldName && fieldComparator && fieldValue) {
      const ruleDto: Rule = {
        uuid: uuid.toString(),
        fieldName,
        fieldValue,
        fieldComparator: fieldComparator
          ? (fieldComparator as ComparatorEnum)
          : ComparatorEnum.Equals,
      };

      toUpdate.push(ruleDto);
    } else {
      hasError = true;
    }
  }

  if (!hasError) {
    for (const rule of toUpdate) {
      const { uuid, ...dto } = rule;
      await updateRule(uuid!, dto, authCookie);
    }

    const variants: Array<StrategyVariant> = allVariantUuids.map(
      (variantUuid, index) => {
        const rolloutPercentage = Number(
          allVariantPercentage[index].toString()
        );

        return {
          variantUuid: variantUuid.toString(),
          rolloutPercentage,
        };
      }
    );

    await editStrategy(
      strategyId,
      {
        valueToServeType: valueToServeType as ValueToServe,
        valueToServe,
        rolloutPercentage: Number(rolloutPercentage),
        variants,
      },
      authCookie
    );
  }

  return {
    successRuleUpdated: !hasError,
    ruleErrors: hasError
      ? {
          ruleAudience: "All the fields are required in every single rule.",
        }
      : undefined,
  };
};

/* eslint-disable sonarjs/cognitive-complexity */
import { updateRule } from "~/modules/rules/services/updateRule";
import { ComparatorEnum, Rule, RuleUpdateDto } from "~/modules/rules/types";
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
  const allFieldSegmentsUuid = formData.getAll("segmentUuid");

  console.log("loool", allFieldSegmentsUuid);

  const toUpdate: Array<RuleUpdateDto & { uuid: string }> = [];
  const entries = allIds.entries();
  let hasError = false;

  for (const [i, uuid] of entries) {
    const fieldName = allFieldName[i]?.toString() || "";
    const fieldComparator = allComparators[i]?.toString() || "";
    const fieldValue = allFieldValue[i]?.toString() || "";
    const segmentUuid = allFieldSegmentsUuid[i]?.toString() || "";

    if (uuid && ((fieldName && fieldComparator && fieldValue) || segmentUuid)) {
      const ruleDto: RuleUpdateDto & { uuid: string } = {
        uuid: uuid.toString(),
        fieldName,
        fieldValue,
        fieldComparator: fieldComparator
          ? (fieldComparator as ComparatorEnum)
          : ComparatorEnum.Equals,
        segmentUuid,
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

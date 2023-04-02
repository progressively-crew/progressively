import { ComparatorEnum } from "~/modules/rules/types";
import { RuleType } from "../types";
import { updateRule } from "../services/updateRule";

export const updateRuleAction = async (
  formData: FormData,
  authCookie: string
) => {
  const allIds = formData.getAll("uuid");
  const allFieldName = formData.getAll("field-name");
  const allComparators = formData.getAll("field-comparator");
  const allFieldValue = formData.getAll("field-value");

  const toUpdate: Array<RuleType & { uuid: string }> = [];
  const entries = allIds.entries();
  let hasError = false;

  for (const [i, uuid] of entries) {
    const fieldName = allFieldName[i]?.toString() || "";
    const fieldComparator = allComparators[i]?.toString() || "";
    const fieldValue = allFieldValue[i]?.toString() || "";

    if (uuid && fieldName && fieldComparator && fieldValue) {
      const ruleDto: RuleType & { uuid: string } = {
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

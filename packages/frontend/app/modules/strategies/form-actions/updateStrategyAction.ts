import {
  ComparatorEnum,
  StrategyValueToServe,
} from "~/modules/strategies/types";
import { updateStrategy } from "../services/updateStrategy";
import { AdditionalAudienceUpdateDTO } from "../types";

export const updateStrategyAction = async (
  formData: FormData,
  authCookie: string
) => {
  const allIds = formData.getAll("eligibility-id");
  const allFieldName = formData.getAll("field-name");
  const allComparators = formData.getAll("field-comparator");
  const allFieldValue = formData.getAll("field-value");
  const allValuesToServeType = formData.getAll("value-to-serve");
  const allValuesToServe = formData.getAll("value-to-serve");

  const toUpdate: Array<AdditionalAudienceUpdateDTO> = [];
  const entries = allIds.entries();
  let hasError = false;

  for (const [i, uuid] of entries) {
    const fieldName = allFieldName[i]?.toString() || "";
    const fieldComparator = allComparators[i]?.toString() || "";
    const fieldValue = allFieldValue[i]?.toString() || "";
    const valueToServe = allValuesToServe[i]?.toString() || "false";
    const valueToServeType =
      allValuesToServeType[i]?.toString() || StrategyValueToServe.Boolean;

    if (uuid && fieldName && fieldComparator && fieldValue) {
      const strategyDto: AdditionalAudienceUpdateDTO = {
        uuid: uuid.toString(),
        fieldName,
        fieldValue,
        fieldComparator: fieldComparator
          ? (fieldComparator as ComparatorEnum)
          : ComparatorEnum.Equals,
        valueToServe: valueToServe,
        valueToServeType: valueToServeType,
      };

      toUpdate.push(strategyDto);
    } else {
      hasError = true;
    }
  }

  if (!hasError) {
    for (const strategyDto of toUpdate) {
      await updateStrategy(strategyDto.uuid!, strategyDto, authCookie);
    }
  }

  return {
    successEligibilityUpdated: !hasError,
    elibilityErrors: hasError
      ? {
          eligbilityAudience:
            "All the fields are required in every single rule.",
        }
      : undefined,
  };
};

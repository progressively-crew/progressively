import { ComparatorEnum } from "~/modules/strategies/types";
import { updateEligibility } from "../services/updateEligibility";
import { UpsertEligibilityDTO } from "../types";

export const updateEligibilityAction = async (
  formData: FormData,
  authCookie: string
) => {
  const allIds = formData.getAll("uuid");
  const allFieldName = formData.getAll("field-name");
  const allComparators = formData.getAll("field-comparator");
  const allFieldValue = formData.getAll("field-value");

  const toUpdate: Array<UpsertEligibilityDTO> = [];
  const entries = allIds.entries();
  let hasError = false;

  for (const [i, uuid] of entries) {
    const fieldName = allFieldName[i]?.toString() || "";
    const fieldComparator = allComparators[i]?.toString() || "";
    const fieldValue = allFieldValue[i]?.toString() || "";

    if (uuid && fieldName && fieldComparator && fieldValue) {
      const eligiblityDto: UpsertEligibilityDTO = {
        uuid: uuid.toString(),
        fieldName,
        fieldValue,
        fieldComparator: fieldComparator
          ? (fieldComparator as ComparatorEnum)
          : ComparatorEnum.Equals,
      };

      toUpdate.push(eligiblityDto);
    } else {
      hasError = true;
    }
  }

  if (!hasError) {
    for (const eligiblityDto of toUpdate) {
      await updateEligibility(eligiblityDto.uuid!, eligiblityDto, authCookie);
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

import { ComparatorEnum } from "~/modules/strategies/types";
import { updateEligibility } from "../services/updateEligibility";
import { UpsertEligibilityDTO } from "../types";

export const updateEligibilityAction = async (
  formData: FormData,
  authCookie: string
) => {
  const allIds = formData.getAll("eligibility-id");
  const allFieldName = formData.getAll("field-name");
  const allComparators = formData.getAll("field-comparator");
  const allFieldValue = formData.getAll("field-value");

  const entries = allIds.entries();

  for (const [i, uuid] of entries) {
    const fieldName = allFieldName[i]?.toString() || "";
    const fieldComparator = allComparators[i]?.toString() || "";
    const fieldValue = allFieldValue[i]?.toString() || "";

    const eligiblityDto: UpsertEligibilityDTO = {
      fieldName,
      fieldValue,
      fieldComparator: fieldComparator
        ? (fieldComparator as ComparatorEnum)
        : ComparatorEnum.Equals,
    };

    await updateEligibility(uuid.toString(), eligiblityDto, authCookie);
  }

  return { successEligibilityUpdated: true };
};

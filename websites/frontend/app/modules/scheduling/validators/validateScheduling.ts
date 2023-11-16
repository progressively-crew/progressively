import { SchedulingCreateDTO, SchedulingType, SchedulingTypes } from "../types";

export const validateScheduling = (values: Partial<SchedulingCreateDTO>) => {
  const errors: { [key: string]: string } = {};

  if (!values.type || !SchedulingTypes.includes(values.type)) {
    errors["type"] = "The type is invalid";
  }

  if (!values.utc) {
    errors["utc"] = "The provided date is invalid";
  }

  if (values.type === SchedulingType.UpdateVariantPercentage) {
    let count = 0;

    const variantPercentages = values.data || [];
    for (const percentage of variantPercentages) {
      count += percentage.variantNewPercentage;
    }

    if (count > 100) {
      errors[
        "rolloutPercentage"
      ] = `The sum of the variant percentage is ${count}% which exceeds 100%.`;
    }

    if (count < 100) {
      errors[
        "rolloutPercentage"
      ] = `The sum of the variant percentage is ${count}% which is lower than 100%.`;
    }
  }

  return errors;
};

import { SchedulingCreateDTO, SchedulingTypes } from "../types";

export const validateScheduling = (values: Partial<SchedulingCreateDTO>) => {
  const errors: { [key: string]: string } = {};

  if (!values.type || !SchedulingTypes.includes(values.type)) {
    errors["type"] = "The type is invalid";
  }

  if (!values.utc) {
    errors["utc"] = "The provided date is invalid";
  }

  // 0 falsy value is valid in this case
  if (
    values.data?.rolloutPercentage === undefined ||
    values.data?.rolloutPercentage === null
  ) {
    errors["rolloutPercentage"] = "The rollout percentage is invalid";
  }

  return errors;
};

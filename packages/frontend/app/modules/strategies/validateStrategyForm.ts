export const validateStrategyForm = (formData: FormData) => {
  const errors: { [key: string]: string } = {};

  const strategyName = formData.get("strategy-name");
  const strategyType = formData.get("strategy-type");
  const activationStrategy = formData.get("strategy-activation");

  if (!strategyName) {
    errors["strategy-name"] = "The strategy name is required.";
  }

  if (strategyType) {
    if (strategyType === "field") {
      const fieldName = formData.get("field-name");
      const fieldValue = formData.get("field-value");
      const fieldComparator = formData.get("field-comparator");

      if (!fieldName) {
        errors["field-name"] = "The field name is required.";
      }

      if (!fieldValue) {
        errors["field-value"] = "The field values are required.";
      }

      if (!fieldComparator) {
        errors["field-comparator"] = "The field comparator is required.";
      }
    }
  } else {
    errors["strategy-type"] = "The strategy audience is required.";
  }

  if (!activationStrategy) {
    errors["strategy-activation"] = "The activation strategy is required.";
  }

  return errors;
};

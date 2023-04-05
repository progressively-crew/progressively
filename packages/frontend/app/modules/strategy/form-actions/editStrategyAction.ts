export const editStrategyAction = (
  formData: FormData,
  strategyId: string,
  authCookie: string
) => {
  const rolloutPercentage = formData.get("rolloutPercentage");
  const valueToServeType = formData.get("value-to-serve-type");
  const valueToServe = formData.get("value-to-serve");

  const fieldNames = formData.getAll("field-name");
  const fieldComparators = formData.getAll("field-comparator");
  const fieldValues = formData.getAll("field-value");

  console.log("LOL", {
    rolloutPercentage,
    valueToServe,
    valueToServeType,
    fieldNames,
    fieldComparators,
    fieldValues,
  });

  return null;
};

export const calculateGrowthRate = (
  initialValue: number,
  finalValue: number
) => {
  if (initialValue === 0) {
    return 0;
  }

  const rateOfChange = Math.round(
    ((finalValue - initialValue) / initialValue) * 100
  );

  return rateOfChange;
};

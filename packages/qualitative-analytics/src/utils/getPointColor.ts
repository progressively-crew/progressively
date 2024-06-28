export const getPointColor = (sizeRatio: number) => {
  if (sizeRatio < 0.2) return "green";
  if (sizeRatio < 0.33) return "yellow";
  if (sizeRatio < 0.66) return "orange";
  return "red";
};

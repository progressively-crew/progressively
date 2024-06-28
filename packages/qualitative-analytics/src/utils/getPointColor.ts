export const getPointColor = (sizeRatio: number) => {
  if (sizeRatio < 0.2) return "#86efac";
  if (sizeRatio < 0.33) return "#fef08a";
  if (sizeRatio < 0.66) return "#fdba74";
  return "#f87171";
};

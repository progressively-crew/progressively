type PredefinedLightness = 90 | 25 | 75;

const PredefinedBgColors = {
  A: "hsl(10, 100%, 75%)",
  B: "hsl(265, 100%, 75%)",
  C: "hsl(122, 100%, 75%)",
};

const PredefinedTextColor = {
  A: "hsl(10, 100%, 25%)",
  B: "hsl(265, 100%, 25%)",
  C: "hsl(122, 100%, 25%)",
};

const PredefinedShapeColor = {
  A: "hsl(10, 100%, 90%)",
  B: "hsl(265, 100%, 90%)",
  C: "hsl(122, 100%, 90%)",
};

const getPredefinedColor = (
  str:
    | keyof typeof PredefinedShapeColor
    | keyof typeof PredefinedTextColor
    | keyof typeof PredefinedBgColors,
  lightness: PredefinedLightness
) => {
  if (lightness === 90) return PredefinedShapeColor[str];
  if (lightness === 25) return PredefinedTextColor[str];
  return PredefinedBgColors[str];
};

export const stringToColor = (
  str: string,
  lightness: PredefinedLightness = 75,
  saturation = 100
) => {
  const maybeColor = getPredefinedColor(str as any, lightness);
  if (maybeColor) return maybeColor;

  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    // eslint-disable-next-line unicorn/prefer-code-point
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }
  return `hsl(${hash % 360}, ${saturation}%, ${lightness}%)`;
};

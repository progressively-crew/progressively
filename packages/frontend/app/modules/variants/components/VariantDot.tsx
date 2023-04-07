import { stringToColor } from "~/modules/misc/utils/stringToColor";

export interface VariantDotProps {
  variant: string;
  size?: "M" | "L";
}

const sizeClasses = {
  M: "h-4 w-4",
  L: "h-6 w-6",
};

export const VariantDot = ({ variant, size = "M" }: VariantDotProps) => {
  const color = stringToColor(variant, 75);
  const sizeClass = sizeClasses[size];

  return (
    <div className={"rounded " + sizeClass} style={{ background: color }} />
  );
};

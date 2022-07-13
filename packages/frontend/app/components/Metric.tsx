import { useId } from "react";
import { styled } from "~/stitches.config";
import { Spacer } from "./Spacer";
import { Typography } from "./Typography";

const MetricWrapper = styled("div", {
  background: "$background",
  padding: "$spacing$8",
  borderRadius: "$borderRadius$regular",
  border: "4px solid transparent",
  variants: {
    highlighted: {
      true: {
        border: "4px solid $hover",
      },
    },
  },
});

const MetricLabel = styled(Typography, {
  textTransform: "uppercase",
  letterSpacing: "2px",
  fontWeight: "$slim",
  lineHeight: "unset",
});

const MetricValue = styled("span", {
  fontFamily: "$default",
  color: "$title",
  fontSize: "$title",
});

const MetricUnit = styled("span", {
  color: "$content",
  fontSize: "$h2",
  fontFamily: "$default",
});

export interface MetricProps {
  value: number | string;
  label: string;
  unit: string;
  highlighted?: boolean;
}

export const Metric = ({ label, unit, value, highlighted }: MetricProps) => {
  const id = useId();

  return (
    <MetricWrapper highlighted={highlighted}>
      <div>
        <MetricValue aria-labelledby={id}>{value}</MetricValue>{" "}
        <MetricUnit>{unit}</MetricUnit>
      </div>
      <Spacer size={1} />
      <MetricLabel id={id}>{label}</MetricLabel>
    </MetricWrapper>
  );
};

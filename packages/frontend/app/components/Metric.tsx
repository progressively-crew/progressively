import { styled } from "~/stitches.config";
import { Spacer } from "./Spacer";
import { Typography } from "./Typography";
import { VisuallyHidden } from "./VisuallyHidden";

const MetricWrapper = styled("div", {
  background: "$background",
  padding: "$spacing$8",
  borderRadius: "$borderRadius$regular",
  border: "6px solid transparent",
  variants: {
    highlighted: {
      true: {
        border: "6px dashed $secondary",
      },
    },
  },
});

const MetricLabel = styled(Typography, {
  letterSpacing: "2px",
  fontWeight: "$slim",
  lineHeight: "unset",
});

const MetricValue = styled("span", {
  fontFamily: "$default",
  color: "$textAccent",
  fontSize: "$title",
});

const MetricUnit = styled("span", {
  color: "$text",
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
  return (
    <MetricWrapper highlighted={highlighted}>
      <VisuallyHidden>{`${label} ${value} ${unit}`}</VisuallyHidden>

      <div aria-hidden>
        <MetricValue>
          {value} <MetricUnit>{unit}</MetricUnit>
        </MetricValue>
      </div>

      <Spacer size={1} />

      <MetricLabel aria-hidden>{label}</MetricLabel>
    </MetricWrapper>
  );
};

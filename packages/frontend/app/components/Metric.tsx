import { styled } from "~/stitches.config";
import { Spacer } from "./Spacer";
import { Typography } from "./Typography";
import { VisuallyHidden } from "./VisuallyHidden";

const MetricWrapper = styled("div", {
  background: "$heracles",
  padding: "$spacing$8",
  borderRadius: "$borderRadius$regular",
  border: "6px solid transparent",
  variants: {
    highlighted: {
      true: {
        border: "6px dashed $nemesis",
      },
    },
  },
});

const MetricLabel = styled(Typography, {
  fontWeight: "$slim",
  lineHeight: "unset",
});

const MetricValue = styled("span", {
  fontFamily: "$default",
  color: "$hades",
  fontSize: "$venus",
});

const MetricUnit = styled("span", {
  color: "$hades",
  fontSize: "$earth",
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

import { styled } from "~/stitches.config";

export interface SpacerProps {
  size: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
}

const RawSpacer = styled("div", {
  variants: {
    size: {
      1: {
        height: "$spacing$1",
      },
      2: {
        height: "$spacing$2",
      },
      3: {
        height: "$spacing$3",
      },
      4: {
        height: "$spacing$4",
      },
      5: {
        height: "$spacing$5",
      },
      6: {
        height: "$spacing$6",
      },
      7: {
        height: "$spacing$7",
      },
      8: {
        height: "$spacing$8",
      },
      9: {
        height: "$spacing$9",
      },
      10: {
        height: "$spacing$10",
      },
    },
  },
});

export const Spacer = ({ size }: SpacerProps) => {
  return <RawSpacer size={size} />;
};

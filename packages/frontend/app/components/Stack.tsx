import { styled } from "~/stitches.config";

export const Stack = styled("div", {
  variants: {
    spacing: {
      1: {
        "& > * + *": {
          marginTop: "$spacing$1",
        },
      },
      2: {
        "& > * + *": {
          marginTop: "$spacing$2",
        },
      },
      3: {
        "& > * + *": {
          marginTop: "$spacing$3",
        },
      },
      4: {
        "& > * + *": {
          marginTop: "$spacing$4",
        },
      },
      5: {
        "& > * + *": {
          marginTop: "$spacing$5",
        },
      },
      6: {
        "& > * + *": {
          marginTop: "$spacing$6",
        },
      },
      7: {
        "& > * + *": {
          marginTop: "$spacing$7",
        },
      },
      8: {
        "& > * + *": {
          marginTop: "$spacing$8",
        },
      },
      9: {
        "& > * + *": {
          marginTop: "$spacing$9",
        },
      },
    },
  },
});

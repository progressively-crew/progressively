import { styled, mapTokenToVariant, spacing, sizes } from "~/stitches.config";

export const HStack = styled<any, any>("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",

  variants: {
    spacing: mapTokenToVariant("gap", spacing, "$spacing"),
    height: mapTokenToVariant("height", sizes),
    justifyContent: {
      "space-between": {
        justifyContent: "space-between",
      },
      "flex-end": {
        justifyContent: "flex-end",
      },
    },

    alignItems: {
      "flex-start": {
        alignItems: "flex-start",
      },
      "flex-end": {
        alignItems: "flex-end",
      },
    },

    direction: {
      column: { flexDirection: "column" },
    },

    gap: {
      "3": { gap: "$spacing$3" },
    },

    inline: {
      true: {
        display: "inline-flex",
      },
    },
  },
});

import { styled, mapTokenToVariant, spacing, sizes } from "~/stitches.config";

export const HStack = styled<any, any>("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  width: "100%",

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
      center: {
        justifyContent: "center",
      },
    },

    alignItems: {
      "flex-start": {
        alignItems: "flex-start",
      },
      "flex-end": {
        alignItems: "flex-end",
      },
      none: {
        alignItems: "revert",
      },
    },

    direction: {
      column: { flexDirection: "column" },
    },

    gap: {
      "1": { gap: "$spacing$1" },
      "2": { gap: "$spacing$2" },
      "3": { gap: "$spacing$3" },
    },

    inline: {
      true: {
        display: "inline-flex",
      },
    },
  },
});

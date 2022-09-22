import { styled } from "./stitches.config";

export const Kbd = styled("kbd", {
  backgroundColor: "$hera",
  borderRadius: "$borderRadius$small",
  border: "1px solid $heracles",
  boxShadow: "inset 0 0 8px #bbb, 0 1px 0 #aaa, 0 4px 0 #bbb",
  color: "$hades",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "$neptune",
  width: "$keyboardKey",
  height: "$keyboardKey",
  transition: "all 0.2s",

  variants: {
    isPressed: {
      true: {
        boxShadow: "inset 0 0 25px #ddd, 0 0 3px #333,  0 2px 0 #bbb",
        color: "#888",
        background: "#ebeced",
        marginTop: "7px",
        borderTop: "1px solid #eee",
      },
    },
  },
});

import { styled } from "~/stitches.config";

export const Kbd = styled("kbd", {
  backgroundColor: "$heracles",
  borderRadius: "$borderRadius$small",
  border: "1px solid $hadesLight",
  boxShadow: "inset 0 0 8px #bbb, 0 1px 0 #aaa, 0 4px 0 #bbb",
  color: "$hades",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "$neptune",
  width: "$keyboardKey",
  height: "$keyboardKey",
});

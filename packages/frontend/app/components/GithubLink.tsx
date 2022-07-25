import { styled } from "~/stitches.config";
import { Button } from "./Buttons/Button";

const GithubLinkWrapper = styled("a", {
  display: "inline-flex",
  fontSize: "$jupiter",
  color: "$text",
  fontFamily: "$default",
  alignItems: "center",
  background: "$background",
  borderRadius: "$borderRadius$regular",
  padding: "0 $spacing$4",
  height: "$cta",
  cursor: "pointer",
  textDecoration: "none",
  border: "1px dashed transparent",
  transition: "all 0.1s",

  "&:hover": {
    color: "$textAccent",
    transform: "scale(1.05)",
  },

  "&:active": {
    color: "$textAccent",
    border: "1px dashed $activeBg",
  },
});

export const GithubLink = () => {
  return (
    <Button
      href="https://github.com/progressively-crew/progressively"
      variant="ghost"
    >
      Github
    </Button>
  );
};

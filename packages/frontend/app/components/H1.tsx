import { styled } from "~/stitches.config";
import { Heading } from "./Heading";

export const RawH1 = styled(Heading, {
  fontSize: "$title",
  fontFamily: "$default",
  fontWeight: "$bold",
  backgroundImage: "linear-gradient(90deg, $title, $primary)",
  backgroundClip: "text",

  "-webkit-background-clip": "text",
  "-webkit-text-fill-color": "transparent",
  "-moz-background-clip": "text",
  "-moz-text-fill-color": "transparent",

  "@mobile": {
    fontSize: "$titleMobile",
  },

  // Since there's no lineheight, we need to pad bottom to avoid
  // breaking letters like "g"
  paddingBottom: "$spacing$2",
});

export const H1: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = (
  props
) => {
  return <RawH1 as="h1" id="page-title" {...props} />;
};

import { styled } from "~/stitches.config";
import { Heading } from "./Heading";

export const RawH1 = styled(Heading, {
  fontSize: "$venus",
  fontFamily: "$default",
  fontWeight: "$bold",
  color: "$textAccent",

  "@mobile": {
    fontSize: "$venusMobile",
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

import { fontSizes, mapTokenToVariant, styled } from "~/stitches.config";
import { HStack } from "./HStack";

const HeadingWrapper = styled<any, any>("h2", {
  color: "$hades",
  fontFamily: "$title",
  variants: {
    fontSize: mapTokenToVariant("fontSize", fontSizes),
  },

  "& svg": {
    fontSize: "$jupiter",
  },
});

type HeadingWrapperType = typeof HeadingWrapper;

export interface HeadingProps extends HeadingWrapperType {
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const Heading = ({ icon, children, ...props }: HeadingProps) => {
  return (
    <HeadingWrapper {...props}>
      <HStack spacing={2}>
        {icon && <span aria-hidden>{icon}</span>}
        {children}
      </HStack>
    </HeadingWrapper>
  );
};

import { Typography } from "./Typography";
import { styled } from "~/stitches.config";
import { HStack } from "./HStack";

const TagLineWrapper = styled(Typography, {
  display: "block",
  textTransform: "uppercase",
  fontSize: "$uranus",
  fontWeight: "$slim",

  "& svg": {
    fontSize: "$neptune",
    color: "$nemesis",
  },

  variants: {
    small: {
      true: {
        fontSize: "$neptune",
      },
    },
  },
});

export interface TagLineProps {
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const TagLine = ({ icon, children, ...props }: TagLineProps) => {
  return (
    <TagLineWrapper {...props}>
      <HStack spacing={1}>
        {icon && <span aria-hidden>{icon}</span>}
        {children}
      </HStack>
    </TagLineWrapper>
  );
};

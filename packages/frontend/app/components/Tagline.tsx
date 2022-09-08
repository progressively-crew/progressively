import { Typography } from "./Typography";
import { styled } from "~/stitches.config";
import { HStack } from "./HStack";

const IconWrapper = styled("span", {
  display: "flex",
  "& svg": {
    fontSize: "$neptune",
    color: "$nemesis",
  },
});

export interface TagLineProps {
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const TagLine = ({ icon, children }: TagLineProps) => {
  return (
    <div>
      <HStack spacing={1}>
        {icon && <IconWrapper aria-hidden>{icon}</IconWrapper>}
        <Typography size="neptune">{children}</Typography>
      </HStack>
    </div>
  );
};

import { Typography } from "./Typography";
import { styled } from "~/stitches.config";

const TagLineWrapper = styled(Typography, {
  display: "block",
  textTransform: "uppercase",
  fontSize: "$uranus",
  fontWeight: "$slim",
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
      {icon && <span aria-hidden>{icon}</span>}
      {children}
    </TagLineWrapper>
  );
};

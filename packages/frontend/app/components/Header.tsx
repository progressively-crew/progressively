import { styled } from "~/stitches.config";
import { H1 } from "./H1";
import { HStack } from "./HStack";
import { Spacer } from "./Spacer";

export interface HeaderProps {
  title: string | React.ReactNode;
  description?: React.ReactNode;
  startAction?: React.ReactNode;
  tagline?: React.ReactNode;
}

const HeadingWrapper = styled("div", {
  display: "flex",
  flexDirection: "column-reverse",
  maxWidth: "80ch",
});

export const Header = ({
  title,
  description,
  startAction,
  tagline,
}: HeaderProps) => {
  return (
    <div>
      <HeadingWrapper>
        <H1>{title}</H1>
        {tagline}
      </HeadingWrapper>

      {description}

      {startAction && <HStack spacing={6}>{startAction}</HStack>}
    </div>
  );
};

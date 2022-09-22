import { styled } from "./stitches.config";
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
  padding: "$spacing$4 0",
});

const Separator = styled("div", {
  width: "1px",
  height: "1rem",
  background: "$hadesLight",
});

const ActionWrapper = styled("div", {
  height: "$cta",
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
        <HStack spacing={6}>
          <H1 as="p" fontWeight="normal">
            {title}
          </H1>

          {startAction && <Separator aria-hidden />}

          <ActionWrapper>{startAction}</ActionWrapper>
        </HStack>

        <Spacer size={1} />
        {tagline}
      </HeadingWrapper>

      {description}
    </div>
  );
};

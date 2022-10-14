import { styled } from "~/stitches.config";
import { H1 } from "./H1";
import { HideTablet } from "./HideMobile";
import { HStack } from "./HStack";
import { Spacer } from "./Spacer";

export interface HeaderProps {
  title: string | React.ReactNode;
  description?: React.ReactNode;
  startAction?: React.ReactNode;
  tagline?: React.ReactNode;
}

const HeadingWrapper = styled("header", {
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
  "@tablet": {
    height: "auto",
  },
});

export const Header = ({
  title,
  description,
  startAction,
  tagline,
}: HeaderProps) => {
  return (
    <div>
      <HeadingWrapper aria-labelledby="header-title">
        <HStack
          spacing={{ "@initial": 6, "@tablet": 2 }}
          direction={{ "@tablet": "column" }}
          alignItems={{ "@tablet": "flex-start" }}
        >
          <H1 as="p" id="header-title">
            {title}
          </H1>

          {startAction && (
            <HideTablet>
              <Separator aria-hidden />
            </HideTablet>
          )}

          <ActionWrapper>{startAction}</ActionWrapper>
        </HStack>

        <Spacer size={1} />
        {tagline}
      </HeadingWrapper>

      {description}
    </div>
  );
};

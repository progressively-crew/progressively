import { styled } from "~/stitches.config";
import { HStack } from "./HStack";
import { Stack } from "./Stack";
import { Typography } from "./Typography";

export interface PageTitleProps {
  value: string;
  icon?: React.ReactNode;
  endAction?: React.ReactNode;
  action?: React.ReactNode;
  description?: React.ReactNode;
}

const IconWrapper = styled("span", {
  color: "$nemesis",
  fontSize: "$mercury",
  marginTop: "$spacing$2",
});

const DescriptionWrapper = styled("div", {
  "& p, & ul li, & span": {
    color: "$hadesLight",
  },
});

const ActionWrapper = styled("div", {
  "@mobile": {
    width: "100%",
  },
});

export const PageTitle = ({
  value,
  icon,
  action,
  description,
  endAction,
}: PageTitleProps) => {
  return (
    <HStack
      justifyContent={{ "@initial": "space-between", "@tablet": "flex-start" }}
      direction={{ "@tablet": "column" }}
      alignItems={{ "@tablet": "flex-start" }}
      spacing={{ "@tablet": 4 }}
    >
      <Stack>
        <HStack spacing={3}>
          {icon && <IconWrapper aria-hidden>{icon}</IconWrapper>}
          <Typography
            size={{ "@initial": "venus", "@mobile": "earth" }}
            font="title"
            color="hades"
            fontWeight="semiBold"
            lineHeight="title"
            as="h1"
            id="page-title"
          >
            <span>{value}</span>
          </Typography>
          {endAction}
        </HStack>

        {description && <DescriptionWrapper>{description}</DescriptionWrapper>}
      </Stack>

      <ActionWrapper>{action}</ActionWrapper>
    </HStack>
  );
};

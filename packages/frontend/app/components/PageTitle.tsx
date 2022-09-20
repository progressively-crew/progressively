import { styled } from "~/stitches.config";
import { HStack } from "./HStack";
import { Stack } from "./Stack";
import { Typography } from "./Typography";

export interface PageTitleProps {
  value: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  description?: React.ReactNode;
}

const IconWrapper = styled("span", {
  color: "$nemesis",
  fontSize: "$mercury",
  marginTop: "$spacing$2",
});

const DescriptionWrapper = styled("div", {
  "& p": {
    color: "$hadesLight",
  },
});

export const PageTitle = ({
  value,
  icon,
  action,
  description,
}: PageTitleProps) => {
  return (
    <HStack justifyContent="space-between">
      <Stack spacing={0}>
        <Typography
          size="venus"
          font="title"
          color="hades"
          fontWeight="semiBold"
          lineHeight="title"
          as="h1"
        >
          <HStack spacing={3}>
            {icon && <IconWrapper aria-hidden>{icon}</IconWrapper>}
            <span>{value}</span>
          </HStack>
        </Typography>

        {description && <DescriptionWrapper>{description}</DescriptionWrapper>}
      </Stack>

      <div>{action}</div>
    </HStack>
  );
};

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
          {icon && <span aria-hidden>{icon}</span>}
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

        {description && <div>{description}</div>}
      </Stack>

      <div>{action}</div>
    </HStack>
  );
};

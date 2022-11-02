import { HStack } from "./HStack";
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
    <HStack spacing={4}>
      <HStack spacing={3}>
        {icon && <span aria-hidden>{icon}</span>}
        <Typography as="h1" id="page-title">
          <span>{value}</span>
        </Typography>
        {endAction}
      </HStack>

      {description && <div>{description}</div>}

      <div>{action}</div>
    </HStack>
  );
};

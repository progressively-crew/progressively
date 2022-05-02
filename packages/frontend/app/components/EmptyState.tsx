import { Icon, Heading, Stack } from "@chakra-ui/react";
import { GiSailboat } from "react-icons/gi";

export interface EmptyStateProps {
  title: string;
  description: React.ReactNode;
  titleAs?: any;
  id?: string;
  action?: React.ReactNode;
}

export const EmptyState = ({
  title,
  description,
  titleAs = "h3",
  id,
  action,
}: EmptyStateProps) => {
  return (
    <Stack alignItems="center" pb={8} spacing={2}>
      <Icon
        aria-hidden
        as={GiSailboat}
        w={40}
        h={40}
        color="background"
        p={12}
        background={"background200"}
        borderRadius="50%"
      />

      <Heading as={titleAs} size="lg" id={id}>
        {title}
      </Heading>

      {description}

      {action}
    </Stack>
  );
};

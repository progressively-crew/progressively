import { Icon, Heading, Stack } from "@chakra-ui/react";
import { GiSailboat } from "react-icons/gi";

export interface EmptyStateProps {
  title: string;
  description: React.ReactNode;
  titleAs?: any;
  id?: string;
}

export const EmptyState = ({
  title,
  description,
  titleAs = "h3",
  id,
}: EmptyStateProps) => {
  return (
    <Stack alignItems="center" pb={8} spacing={2}>
      <Icon
        aria-hidden
        as={GiSailboat}
        w={40}
        h={40}
        color="backgroundContent"
        p={12}
        background={"background"}
        borderRadius="50%"
      />

      <Heading as={titleAs} size="lg" id={id}>
        {title}
      </Heading>

      {description}
    </Stack>
  );
};

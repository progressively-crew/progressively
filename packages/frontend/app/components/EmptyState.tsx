import { Heading } from "./Heading";
import { EmptyBoxIcon } from "./Icons/EmptyBoxIcon";
import { Spacer } from "./Spacer";
import { Stack } from "./Stack";

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
    <div>
      <EmptyBoxIcon />

      <Spacer size={6} />

      <Stack spacing={2}>
        <Heading as={titleAs} size="lg" id={id}>
          {title}
        </Heading>

        {description}

        {action}
      </Stack>
    </div>
  );
};

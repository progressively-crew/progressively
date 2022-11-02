import { Heading } from "./Heading";
import { EmptyBoxIcon } from "./Icons/EmptyBoxIcon";
import { Spacer } from "./Spacer";

export interface EmptyStateProps {
  title: string;
  description: React.ReactNode;
  titleAs?: string;
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

      <Heading as={titleAs} id={id}>
        {title}
      </Heading>

      <Spacer size={2} />

      <div>{description}</div>

      <Spacer size={2} />

      {action && <div className="action">{action}</div>}
    </div>
  );
};

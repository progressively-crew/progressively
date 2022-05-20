import { GiSailboat } from "react-icons/gi";
import { Heading } from "./Heading";

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
      <GiSailboat aria-hidden />

      <Heading as={titleAs} size="lg" id={id}>
        {title}
      </Heading>

      {description}

      {action}
    </div>
  );
};

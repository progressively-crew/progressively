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
  const HeadingComponent = titleAs as any;
  return (
    <div className="flex flex-col items-center py-10">
      <div className="h-40 w-40 fill-indigo-700">
        <EmptyBoxIcon />
      </div>

      <Spacer size={6} />

      <HeadingComponent id={id} className="text-3xl">
        {title}
      </HeadingComponent>

      <Spacer size={2} />

      <div className="max-w-lg text-center">{description}</div>

      <Spacer size={2} />

      {action && <div className="inline-block">{action}</div>}
    </div>
  );
};

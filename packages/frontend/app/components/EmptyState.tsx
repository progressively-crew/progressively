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
    <div className="flex flex-col items-center lg:py-10">
      <div className="h-32 w-32 fill-gray-200">
        <EmptyBoxIcon />
      </div>

      <Spacer size={6} />

      <HeadingComponent
        id={id}
        className="text-2xl text-gray-500 dark:text-slate-200"
      >
        {title}
      </HeadingComponent>

      <Spacer size={2} />

      <div className="max-w-lg text-center">{description}</div>

      <Spacer size={2} />

      {action && <div className="inline-block">{action}</div>}
    </div>
  );
};

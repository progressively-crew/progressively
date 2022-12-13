import { HStack } from "./HStack";
import { Spacer } from "./Spacer";

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
    <div className="flex flex-col md:flex-row md:justify-between gap-3">
      <div>
        <HStack spacing={3}>
          {icon && (
            <span
              aria-hidden
              className="text-indigo-700 dark:text-indigo-300 text-4xl"
            >
              {icon}
            </span>
          )}
          <h1
            className="font-bold text-4xl md:text-5xl dark:text-white"
            id="page-title"
          >
            <span>{value}</span>
          </h1>
          <div className="h-12">{endAction}</div>
        </HStack>

        {description && (
          <div>
            <Spacer size={2} />
            {description}
          </div>
        )}
      </div>

      <div>{action}</div>
    </div>
  );
};

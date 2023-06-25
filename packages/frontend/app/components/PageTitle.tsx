import { HStack } from "./HStack";

export interface PageTitleProps {
  value: string;
  action?: React.ReactNode;
  description?: React.ReactNode;
}

export const PageTitle = ({ value, action, description }: PageTitleProps) => {
  return (
    <div className="flex flex-col md:flex-row md:justify-between gap-3 md:items-center">
      <div>
        <HStack spacing={3}>
          <div>
            <h1
              className="text-4xl font-extrabold tracking-tight lg:text-2xl dark:text-white"
              id="page-title"
            >
              {value}
            </h1>
            {description && (
              <div className="text-slate-700 dark:text-slate-400">
                {description}
              </div>
            )}
          </div>
        </HStack>
      </div>

      {action}
    </div>
  );
};

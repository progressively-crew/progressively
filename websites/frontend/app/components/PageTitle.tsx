import { HStack } from "./HStack";

export interface PageTitleProps {
  value: string;
  action?: React.ReactNode;
  description?: React.ReactNode;
}

export const PageTitle = ({ value, action, description }: PageTitleProps) => {
  return (
    <div className="flex flex-col md:flex-row md:justify-between gap-8 md:items-center">
      <div>
        <HStack spacing={3}>
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl font-title">
              {value}
            </h1>
            {description && (
              <div className="text-gray-700 pt-2 text-xl max-w-3xl">
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

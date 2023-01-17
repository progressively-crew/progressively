import { HStack } from "./HStack";
import { Spacer } from "./Spacer";

export interface PageTitleProps {
  value: string;
  endAction?: React.ReactNode;
  action?: React.ReactNode;
  description?: React.ReactNode;
}

export const PageTitle = ({
  value,
  action,
  description,
  endAction,
}: PageTitleProps) => {
  return (
    <div className="flex flex-col md:flex-row md:justify-between gap-3 items-center">
      <div>
        <HStack spacing={3}>
          <h1
            className="font-semibold text-4xl md:text-5xl dark:text-white"
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

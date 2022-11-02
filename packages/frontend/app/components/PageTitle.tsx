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
    <div className="flex justify-between">
      <div>
        <HStack spacing={3}>
          {icon && (
            <span aria-hidden className="text-indigo-700 text-4xl">
              {icon}
            </span>
          )}
          <h1 className="font-bold text-6xl" id="page-title">
            <span>{value}</span>
          </h1>
          {endAction}
        </HStack>

        {description && <div>{description}</div>}
      </div>

      <div>{action}</div>
    </div>
  );
};

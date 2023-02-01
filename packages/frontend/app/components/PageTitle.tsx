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
            className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl dark:text-white"
            id="page-title"
          >
            <span>{value}</span>
          </h1>
          <div className="h-12">{endAction}</div>
        </HStack>

        {description && (
          <div className="text-xl text-slate-700 dark:text-slate-400 font-light">
            <Spacer size={2} />
            {description}
          </div>
        )}
      </div>

      <div>{action}</div>
    </div>
  );
};

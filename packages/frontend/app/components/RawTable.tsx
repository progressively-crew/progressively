import React, { forwardRef, HTMLAttributes } from "react";

export interface RawTableProps extends HTMLAttributes<HTMLTableElement> {
  children: React.ReactNode;
  caption: string;
  role?: string;
}

export const RawTable = forwardRef(
  ({ children, caption, ...props }: RawTableProps, ref: any) => {
    return (
      <div className="overflow-x-auto overflow-y-clip">
        <table
          ref={ref}
          className="w-full border-separate border-spacing-0"
          {...props}
        >
          <caption className="sr-only">{caption}</caption>
          {children}
        </table>
      </div>
    );
  }
);

export const Tr = ({
  onClick,
  className,
  ...props
}: React.HTMLAttributes<HTMLTableRowElement>) => {
  const isClickable = Boolean(onClick);

  const classNameTr = isClickable
    ? "border-l-8 border-l-transparent hover:bg-gray-50 hover:dark:bg-slate-700 hover:border-l-indigo-500 hover:cursor-pointer active:bg-gray-100 active:dark:bg-slate-600 border-b border-b-gray-100"
    : "border-b border-b-gray-100";

  return (
    <tr
      onClick={onClick}
      className={classNameTr + " " + className || ""}
      {...props}
    />
  );
};

export const Td = (props: React.HTMLAttributes<HTMLTableCellElement>) => {
  return (
    <td className="py-4 px-8 dark:text-gray-200 whitespace-nowrap" {...props} />
  );
};

export const Th = ({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLTableCellElement>) => {
  return (
    <th
      className={
        "py-3 px-8 bg-gray-100 dark:bg-slate-800 text-left text-sm text-gray-600 dark:text-slate-200 tracking-wide whitespace-nowrap " +
        className
      }
      {...props}
    />
  );
};

RawTable.displayName = "RawTable";

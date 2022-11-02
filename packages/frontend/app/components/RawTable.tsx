import React, { forwardRef } from "react";

export const RawTable = forwardRef((props: any, ref: any) => {
  return (
    <div className="overflow-x-auto overflow-y-clip">
      <table ref={ref} {...props} className="w-full" />
    </div>
  );
});

export const Tr = ({
  onClick,
  ...props
}: React.HTMLAttributes<HTMLTableRowElement>) => {
  const isClickable = Boolean(onClick);

  return (
    <tr
      onClick={onClick}
      className={
        isClickable
          ? "border-l-8 border-l-transparent hover:bg-gray-50 hover:border-l-indigo-500 hover:cursor-pointer active:bg-gray-100"
          : undefined
      }
      {...props}
    />
  );
};

export const Td = (props: React.HTMLAttributes<HTMLTableCellElement>) => {
  return <td className="py-4 px-6" {...props} />;
};

export const Th = (props: React.HTMLAttributes<HTMLTableCellElement>) => {
  return (
    <th
      className="py-3 px-6 bg-gray-100 text-left uppercase text-sm text-gray-600 tracking-wide"
      {...props}
    />
  );
};

RawTable.displayName = "RawTable";

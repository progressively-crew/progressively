import { forwardRef } from "react";

export const RawTable = forwardRef((props: any, ref: any) => {
  return (
    <div className="overflow-x-auto overflow-y-clip border border-color-gray-500 rounded bg-white">
      <table ref={ref} {...props} className="w-full" />
    </div>
  );
});

export interface TrProps {
  onClick?: () => void;
  children: React.ReactNode;
}
export const Tr = ({ children, onClick }: TrProps) => {
  const isClickable = Boolean(onClick);

  return (
    <tr
      onClick={onClick}
      className={
        isClickable
          ? "border-l-8 border-l-transparent hover:bg-gray-50 hover:border-l-indigo-500 hover:cursor-pointer active:bg-gray-100"
          : undefined
      }
    >
      {children}
    </tr>
  );
};

export interface TdProps {
  children: React.ReactNode;
}

export const Td = ({ children }: TdProps) => {
  return <td className="py-4 px-6">{children}</td>;
};

export interface ThProps {
  children: React.ReactNode;
}

export const Th = ({ children }: ThProps) => {
  return (
    <th className="py-3 px-6 bg-gray-100 text-left uppercase text-sm text-gray-600 tracking-wide">
      {children}
    </th>
  );
};

RawTable.displayName = "RawTable";

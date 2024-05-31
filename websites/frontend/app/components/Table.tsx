import { HTMLAttributes } from "react";

export interface TableProps {
  children: React.ReactNode;
  noBorder?: boolean;
  className?: string;
}

export const Table = ({ children, noBorder }: TableProps) => {
  return (
    <div
      className={
        noBorder
          ? "overflow-hidden w-full"
          : "border border-slate-200 overflow-hidden rounded-xl"
      }
    >
      <div className="overflow-x-scroll">
        <table className="border-collapse table-auto w-full text-sm ">
          {children}
        </table>
      </div>
    </div>
  );
};
export const Th = ({ children, className }: TableProps) => {
  return (
    <th
      className={
        "whitespace-nowrap bg-slate-50 font-medium p-4 pl-8 py-3 text-slate-500 text-left " +
        (className || "")
      }
    >
      {children}
    </th>
  );
};
export const Td = ({
  children,
  style,
}: TableProps & HTMLAttributes<HTMLTableCellElement>) => {
  return (
    <td
      className="border-t border-slate-200 p-4 pl-8 text-slate-500"
      style={style}
    >
      {children}
    </td>
  );
};

export const Tbody = ({ children }: TableProps) => {
  return <tbody className="bg-white">{children}</tbody>;
};

export const Tr = ({
  children,
  onClick,
}: TableProps & { onClick?: () => void }) => {
  return (
    <tr
      className={
        onClick ? "cursor-pointer hover:bg-slate-50 active:bg-slate-100" : ""
      }
      onClick={onClick}
    >
      {children}
    </tr>
  );
};

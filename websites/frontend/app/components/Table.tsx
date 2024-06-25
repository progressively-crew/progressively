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
          : "border border-gray-200 overflow-hidden rounded-xl"
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
        "whitespace-nowrap bg-gray-50 font-medium p-4 pl-8 py-3 text-gray-500 text-left " +
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
  className,
}: TableProps & HTMLAttributes<HTMLTableCellElement>) => {
  return (
    <td
      className={
        "border-t border-gray-200 p-4 pl-8 text-gray-500 " + (className || "")
      }
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
        onClick ? "cursor-pointer hover:bg-gray-50 active:bg-gray-100" : ""
      }
      onClick={onClick}
    >
      {children}
    </tr>
  );
};

export interface TableProps {
  children: React.ReactNode;
}

export const Table = ({ children }: TableProps) => {
  return (
    <table className="border-collapse table-auto w-full text-sm">
      {children}
    </table>
  );
};
export const Th = ({ children }: TableProps) => {
  return (
    <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
      {children}
    </th>
  );
};
export const Td = ({ children }: TableProps) => {
  return (
    <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
      {children}
    </td>
  );
};

export const Tbody = ({ children }: TableProps) => {
  return <tbody className="bg-white dark:bg-slate-800">{children}</tbody>;
};

export const Tr = ({
  children,
  onClick,
}: TableProps & { onClick?: () => void }) => {
  return (
    <tr
      className={
        onClick
          ? "cursor-pointer hover:bg-slate-50 active:bg-slate-100 hover:dark:bg-slate-700 active:dark:bg-slate-600"
          : ""
      }
      onClick={onClick}
    >
      {children}
    </tr>
  );
};

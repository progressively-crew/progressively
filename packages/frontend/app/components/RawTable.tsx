import { forwardRef } from "react";

export const RawTable = forwardRef((props: any, ref: any) => {
  return (
    <div className="overflow-x-auto overflow-y-clip">
      <table ref={ref} {...props} />
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
    <tr onClick={onClick} className={isClickable ? "clickable" : undefined}>
      {children}
    </tr>
  );
};

export interface TdProps {
  children: React.ReactNode;
}

export const Td = ({ children }: TdProps) => {
  return <td>{children}</td>;
};

export interface ThProps {
  children: React.ReactNode;
}

export const Th = ({ children }: ThProps) => {
  return <th>{children}</th>;
};

RawTable.displayName = "RawTable";

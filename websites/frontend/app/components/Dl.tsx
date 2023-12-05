import { Typography } from "./Typography";

export interface DlProps {
  children: React.ReactNode;
}

export const Dl = ({ children }: DlProps) => {
  return (
    <dl className="grid grid-cols-[auto_1fr] gap-4 items-center">{children}</dl>
  );
};

export const Dt = ({ children }: DlProps) => {
  return (
    <Typography as="dt" className="text-slate-600 text-xs">
      {children}
    </Typography>
  );
};

export const Dd = ({ children }: DlProps) => {
  return <Typography as="dd">{children}</Typography>;
};

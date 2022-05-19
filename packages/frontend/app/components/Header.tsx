import { H1 } from "./H1";

export interface HeaderProps {
  title: string | React.ReactNode;
  description?: React.ReactNode;
  startAction?: React.ReactNode;
}

export const Header = ({ title, description, startAction }: HeaderProps) => {
  return (
    <div>
      <H1>{title}</H1>

      {description}

      {startAction}
    </div>
  );
};

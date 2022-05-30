import { styled } from "~/stitches.config";
import { H1 } from "./H1";
import { Spacer } from "./Spacer";

export interface HeaderProps {
  title: string | React.ReactNode;
  description?: React.ReactNode;
  startAction?: React.ReactNode;
}

const HeaderRow = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "$spacing$10",
});

export const Header = ({ title, description, startAction }: HeaderProps) => {
  return (
    <div>
      <H1>{title}</H1>

      {description || startAction ? <Spacer size={2} /> : null}

      {description}

      {startAction && <HeaderRow>{startAction}</HeaderRow>}
    </div>
  );
};

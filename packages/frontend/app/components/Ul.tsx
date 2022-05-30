import { styled } from "~/stitches.config";

export interface UlProps {
  children: React.ReactNode;
}

const ULWrapper = styled("ul", {
  paddingLeft: "$spacing$9",
  listStyle: "initial",
  display: "flex",
  flexDirection: "column",
  gap: "$spacing$2",

  "& li": { lineHeight: "$content" },
});

export const Ul = ({ children }: UlProps) => {
  return <ULWrapper>{children}</ULWrapper>;
};

export interface LiProps {
  children: React.ReactNode;
  id?: string;
  color?: string;
}

export const Li = ({ children, id }: LiProps) => {
  return <li id={id}>{children}</li>;
};

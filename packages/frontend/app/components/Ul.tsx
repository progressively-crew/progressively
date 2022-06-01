import { styled } from "~/stitches.config";

export interface UlProps {
  children: React.ReactNode;
}

export const Ul = styled("ul", {
  paddingLeft: "$spacing$9",
  listStyle: "initial",
  display: "flex",
  flexDirection: "column",
  gap: "$spacing$2",
  fontFamily: "$default",

  "& li": { lineHeight: "$content" },
});

export interface LiProps {
  children: React.ReactNode;
  id?: string;
  color?: string;
}

export const Li = ({ children, id }: LiProps) => {
  return <li id={id}>{children}</li>;
};

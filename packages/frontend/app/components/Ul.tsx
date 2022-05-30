import { styled } from "~/stitches.config";

export interface UlProps {
  children: React.ReactNode;
}

const ULWrapper = styled("ul", {
  paddingLeft: "$spacing$9",
  listStyle: "initial",
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

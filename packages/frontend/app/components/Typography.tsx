import { HTMLAttributes } from "react";

export interface TypographyProps extends HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  as?: any;
  fontSize?: "xl" | "sm";
  color?: "textlight";
}

export const Typography = ({
  children,
  as = "p",
  ...props
}: TypographyProps) => {
  const Compo = as;
  return <Compo {...props}>{children}</Compo>;
};

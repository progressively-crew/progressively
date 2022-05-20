import { Link as RLink } from "remix";
import { forwardRef, Link as CLink } from "@chakra-ui/react";
import { HTMLAttributes } from "react";

export interface LinkProps extends HTMLAttributes<HTMLAnchorElement> {
  to: string;
  children: React.ReactNode;
}
export const Link = forwardRef(({ to, children, ...props }: LinkProps, ref) => {
  return (
    <CLink ref={ref} as={RLink} to={to} textDecoration={"underline"} {...props}>
      {children}
    </CLink>
  );
});

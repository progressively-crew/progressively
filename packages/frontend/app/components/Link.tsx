import { Link as RLink } from "remix";
import { forwardRef, Link as CLink } from "@chakra-ui/react";

export interface LinkProps {
  to: string;
  children: React.ReactNode;
}
export const Link = forwardRef(({ to, children }: LinkProps, ref) => {
  return (
    <CLink ref={ref} as={RLink} to={to} textDecoration={"underline"}>
      {children}
    </CLink>
  );
});

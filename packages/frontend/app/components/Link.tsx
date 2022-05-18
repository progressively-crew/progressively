import { Link as RLink } from "remix";
import { Link as CLink } from "@chakra-ui/react";

export interface LinkProps {
  to: string;
  children: React.ReactNode;
}
export const Link = ({ to, children }: LinkProps) => {
  return (
    <CLink as={RLink} to={to} textDecoration={"underline"}>
      {children}
    </CLink>
  );
};

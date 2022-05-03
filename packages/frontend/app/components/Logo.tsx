import { Link } from "remix";
import { Link as CLink } from "@chakra-ui/react";

export interface LogoProps {
  to?: string;
}
export const Logo = ({ to }: LogoProps) => (
  <CLink as={Link} to={to || "/dashboard"} display="flex" alignItems="center">
    Progressively
  </CLink>
);

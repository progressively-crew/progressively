import { Link } from "remix";
import { GiSailboat } from "react-icons/gi";
import { Icon, Link as CLink } from "@chakra-ui/react";

export interface LogoProps {
  to?: string;
}
export const Logo = ({ to }: LogoProps) => (
  <CLink
    as={Link}
    to={to || "/dashboard"}
    display="flex"
    alignItems="center"
    fontWeight={"bold"}
    h={12}
  >
    <Icon as={GiSailboat} aria-hidden mr={2} w={6} h={6} />
    Rollout
  </CLink>
);

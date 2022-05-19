import { Link } from "remix";
import { Link as CLink } from "@chakra-ui/react";
import { VisuallyHidden } from "./VisuallyHidden";

export interface LogoProps {
  to?: string;
}
export const Logo = ({ to }: LogoProps) => (
  <CLink
    as={Link}
    to={to || "/dashboard"}
    display="flex"
    alignItems="center"
    _hover={{ textDecoration: "none" }}
  >
    <VisuallyHidden>Progressively</VisuallyHidden>
    <span>
      Progress
      <span>ively</span>
    </span>
  </CLink>
);

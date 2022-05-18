import { Link } from "remix";
import { Box, Link as CLink } from "@chakra-ui/react";
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
    <Box
      as="span"
      aria-hidden
      fontSize={"lg"}
      textTransform="uppercase"
      fontWeight="extrabold"
      letterSpacing={2}
      color="brand.400"
    >
      Progress
      <Box
        as="span"
        color="textlight"
        borderBottomWidth={2}
        borderBottomColor="textlight"
      >
        ively
      </Box>
    </Box>
  </CLink>
);

import { Box, HStack, Link as CLink } from "@chakra-ui/react";
import { NavLink } from "remix";

export interface HorizontalNavProps {
  children: React.ReactNode;
  label: string;
}
export const HorizontalNav = ({ children, label }: HorizontalNavProps) => {
  return (
    <Box
      as="nav"
      aria-label={label}
      borderRadius={32}
      overflowX="scroll"
      bg="background100"
    >
      <HStack as="ul" listStyleType={"none"} spacing={3} p={1}>
        {children}
      </HStack>
    </Box>
  );
};

export interface NavItemProps {
  children: React.ReactNode;
  to: string;
  icon: React.ReactNode;
}

export const NavItem = ({ children, to, icon }: NavItemProps) => {
  return (
    <Box as="li" flexShrink={0}>
      <CLink
        as={NavLink}
        px={6}
        py={3}
        to={to}
        end
        display={"inline-block"}
        className="custom-nav-link"
        fontSize="lg"
        borderRadius={32}
      >
        <HStack as="span" spacing={2}>
          <span aria-hidden>{icon}</span>
          <span>{children}</span>
        </HStack>
      </CLink>
    </Box>
  );
};

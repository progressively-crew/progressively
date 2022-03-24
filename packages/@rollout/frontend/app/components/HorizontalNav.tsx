import { Box, HStack } from "@chakra-ui/react";
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
      borderBottomWidth={1}
      borderBottomColor="background300"
      overflowX="scroll"
    >
      <HStack as="ul" listStyleType={"none"} spacing={3}>
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
      <Box
        as={NavLink}
        px={2}
        py={4}
        to={to}
        end
        display={"block"}
        className="custom-nav-link"
      >
        <HStack as="span" spacing={2}>
          <span aria-hidden>{icon}</span>
          <span>{children}</span>
        </HStack>
      </Box>
    </Box>
  );
};

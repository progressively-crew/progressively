import { Container, HStack, Link as CLink } from "@chakra-ui/react";
import { NavLink } from "remix";

export interface HorizontalNavProps {
  children: React.ReactNode;
  label: string;
}
export const HorizontalNav = ({ children, label }: HorizontalNavProps) => {
  return (
    <nav aria-label={label}>
      <Container maxW="5xl">
        <HStack
          as="ul"
          listStyleType={"none"}
          spacing={3}
          sx={{
            "li:first-of-type a": {
              paddingInlineStart: "0",
            },
          }}
        >
          {children}
        </HStack>
      </Container>
    </nav>
  );
};

export interface NavItemProps {
  children: React.ReactNode;
  to: string;
  icon: React.ReactNode;
}

export const NavItem = ({ children, to, icon }: NavItemProps) => {
  return (
    <li>
      <CLink
        as={NavLink}
        px={6}
        py={4}
        to={to}
        end
        display={"inline-block"}
        className="custom-nav-link"
        fontSize="lg"
      >
        <HStack as="span" spacing={2}>
          <span aria-hidden>{icon}</span>
          <span>{children}</span>
        </HStack>
      </CLink>
    </li>
  );
};

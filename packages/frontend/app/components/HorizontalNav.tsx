import { Link as CLink } from "@chakra-ui/react";
import { NavLink } from "remix";
import { Container } from "./Container";

export interface HorizontalNavProps {
  children: React.ReactNode;
  label: string;
}
export const HorizontalNav = ({ children, label }: HorizontalNavProps) => {
  return (
    <nav aria-label={label}>
      <Container>
        <ul>{children}</ul>
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
        <span aria-hidden>{icon}</span>
        <span>{children}</span>
      </CLink>
    </li>
  );
};

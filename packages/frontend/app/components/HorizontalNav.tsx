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
      <NavLink to={to} className="custom-nav-link">
        <span aria-hidden>{icon}</span>
        <span>{children}</span>
      </NavLink>
    </li>
  );
};

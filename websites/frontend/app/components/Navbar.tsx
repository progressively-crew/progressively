import { NavLink } from "@remix-run/react";
import { HStack } from "./HStack";

export interface NavItemProps {
  children: React.ReactNode;
  to: string;
  icon?: React.ReactNode;
  target?: string;
}

export const NavItem = ({ children, to, icon, target }: NavItemProps) => {
  const shared = `h-10 rounded whitespace-nowrap shrink-0 text-sm block flex items-center px-3 text-gray-700 hover:bg-gray-100`;

  return (
    <li>
      <NavLink
        to={to}
        end
        target={target}
        className={({ isActive }) =>
          isActive ? `${shared} border-b-gray-900 text-gray-900` : shared
        }
      >
        <HStack spacing={2}>
          {icon}
          {children}
        </HStack>
      </NavLink>
    </li>
  );
};

export interface NavbarProps {
  children: React.ReactNode;
  label: string;
}

export const Navbar = ({ children, label }: NavbarProps) => {
  return <nav aria-label={label}>{children}</nav>;
};

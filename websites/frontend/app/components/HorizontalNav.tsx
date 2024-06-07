import { NavLink } from "@remix-run/react";
import { HStack } from "./HStack";

export interface HorizontalNavProps {
  children: React.ReactNode;
  label: string;
}

export const HorizontalNav = ({ children, label }: HorizontalNavProps) => {
  return (
    <nav aria-label={label} className="bg-gray-50 px-4">
      <ul className="flex flex-row items-center overflow-x-scroll">
        {children}
      </ul>
    </nav>
  );
};

export interface NavItemProps {
  children: React.ReactNode;
  to: string;
  icon?: React.ReactNode;
  target?: string;
}

export const NavItem = ({ children, to, icon, target }: NavItemProps) => {
  const shared = `-outline-offset-2 py-2 border-b-2 border-t-2 border-transparent whitespace-nowrap shrink-0 text-sm block flex items-center px-4 text-gray-700 hover:bg-gray-100 active:bg-gray-200`;

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

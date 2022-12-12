import { NavLink } from "@remix-run/react";
import { HStack } from "./HStack";

export interface HorizontalNavProps {
  children: React.ReactNode;
  label: string;
}

export const HorizontalNav = ({ children, label }: HorizontalNavProps) => {
  return (
    <nav
      aria-label={label}
      className="w-full h-full bg-indigo-100 lg:bg-white border-r border-color-gray-500 lg:p-8"
    >
      <ul className="overflow-x-scroll flex flex-row gap-3 lg:flex-col">
        {children}
      </ul>
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
      <NavLink
        to={to}
        end
        className={({ isActive }) =>
          isActive
            ? "h-10 block flex items-center rounded px-4 bg-indigo-700 text-white lg:bg-indigo-100 lg:text-indigo-700 font-bold"
            : "h-10 block flex items-center rounded px-4 hover:bg-gray-100 active:bg-gray-200 text-gray-500"
        }
      >
        <HStack spacing={2}>
          <span aria-hidden>{icon}</span>
          <span>{children}</span>
        </HStack>
      </NavLink>
    </li>
  );
};

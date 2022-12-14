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
      className="w-full h-full dark:bg-slate-800 bg-indigo-100 lg:bg-white lg:dark:bg-slate-800 border-r border-r-gray-100 dark:border-r-slate-700 lg:p-8"
    >
      <ul className="overflow-x-scroll flex flex-row lg:gap-3 lg:flex-col">
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
            ? "h-10 block flex items-center lg:rounded px-4 bg-indigo-700 font-bold text-white lg:bg-indigo-100 lg:text-indigo-700 lg:dark:bg-slate-600 lg:dark:text-white"
            : "h-10 block flex items-center lg:rounded px-4 hover:bg-gray-100 hover:dark:bg-slate-700 active:bg-gray-200 active:dark:bg-slate-700 text-gray-500 dark:text-gray-300"
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

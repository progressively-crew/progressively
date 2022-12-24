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
      className="w-full dark:bg-slate-800 bg-indigo-100 lg:bg-white lg:dark:bg-slate-800 p-2 rounded-full border border-gray-100 dark:border-none dark:drop-shadow-xl"
    >
      <ul className="overflow-x-scroll flex flex-row gap-4">{children}</ul>
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
            ? "h-10 block flex items-center rounded-full px-4 bg-indigo-700 font-bold text-white lg:bg-indigo-100 lg:text-indigo-700 lg:dark:bg-slate-600 lg:dark:text-slate-100"
            : "h-10 block flex items-center rounded-full px-4 hover:bg-gray-100 hover:dark:bg-slate-700 active:bg-gray-200 active:dark:bg-slate-600 text-gray-500 dark:text-gray-300"
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

import { NavLink } from "@remix-run/react";
import { HStack } from "./HStack";

export interface HorizontalNavProps {
  children: React.ReactNode;
  label: string;
}

export const HorizontalNav = ({ children, label }: HorizontalNavProps) => {
  return (
    <nav aria-label={label} className="p-4">
      <ul className="flex flex-col gap-2">{children}</ul>
    </nav>
  );
};

export interface NavItemProps {
  children: React.ReactNode;
  to: string;
  icon?: React.ReactNode;
}

export const NavItem = ({ children, to, icon }: NavItemProps) => {
  const focusStyles =
    "focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:focus:ring-offset-slate-900";

  return (
    <li>
      <NavLink
        to={to}
        end
        className={({ isActive }) =>
          isActive
            ? "font-bold h-10 block flex items-center rounded px-3 bg-gray-200 text-gray-700 dark:bg-slate-600 dark:text-slate-50 " +
              focusStyles
            : "h-10 block flex items-center rounded px-3 text-gray-700 hover:bg-gray-100 hover:dark:bg-slate-700  dark:text-gray-300 " +
              focusStyles
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

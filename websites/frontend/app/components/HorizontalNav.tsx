import { NavLink } from "@remix-run/react";
import { HStack } from "./HStack";

export interface HorizontalNavProps {
  children: React.ReactNode;
  label: string;
}

export const HorizontalNav = ({ children, label }: HorizontalNavProps) => {
  return (
    <nav aria-label={label}>
      <ul className="flex flex-row gap-4">{children}</ul>
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
  const focusStyles =
    "focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:focus:ring-offset-slate-900";

  return (
    <li>
      <NavLink
        to={to}
        end
        target={target}
        className={({ isActive }) =>
          isActive
            ? "whitespace-nowrap shrink-0 text-sm font-bold h-8 block flex items-center rounded px-3 bg-gray-100 text-gray-700 dark:bg-slate-600 dark:text-slate-50 " +
              focusStyles
            : "whitespace-nowrap shrink-0 text-sm h-8 block flex items-center rounded px-3 text-gray-700 hover:bg-gray-50 hover:dark:bg-slate-700 dark:text-gray-300 " +
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

import { NavLink } from "@remix-run/react";
import { HStack } from "./HStack";

export interface HorizontalNavProps {
  children: React.ReactNode;
  label: string;
}

export const HorizontalNav = ({ children, label }: HorizontalNavProps) => {
  return (
    <nav aria-label={label} className="bg-slate-50 px-8">
      <ul className="flex flex-row gap-4 items-center">{children}</ul>
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

  const shared = `${focusStyles} py-2 border-b-2 border-t-2 border-transparent whitespace-nowrap shrink-0 text-sm block flex items-center px-3 text-gray-700 hover:bg-slate-100 hover:dark:bg-slate-700 dark:text-slate-300`;

  return (
    <li>
      <NavLink
        to={to}
        end
        target={target}
        className={({ isActive }) =>
          isActive ? `${shared}  border-b-slate-900 text-slate-900` : shared
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

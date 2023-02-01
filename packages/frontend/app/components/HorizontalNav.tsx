import { NavLink } from "@remix-run/react";

export interface HorizontalNavProps {
  children: React.ReactNode;
  label: string;
}

export const HorizontalNav = ({ children, label }: HorizontalNavProps) => {
  return (
    <nav aria-label={label} className="w-full dark:bg-slate-800 bg-white">
      <ul className="overflow-x-scroll flex flex-row gap-4 items-center py-3 px-1">
        {children}
      </ul>
    </nav>
  );
};

export interface NavItemProps {
  children: React.ReactNode;
  to: string;
}

export const NavItem = ({ children, to }: NavItemProps) => {
  const focusStyles =
    "focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:focus:ring-offset-slate-900";

  return (
    <li>
      <NavLink
        to={to}
        end
        className={({ isActive }) =>
          isActive
            ? "h-8 block flex items-center rounded px-3 bg-gray-100 text-gray-700 dark:bg-slate-600 dark:text-slate-50 text-sm " +
              focusStyles
            : "h-8 block flex items-center rounded px-3 hover:bg-gray-50 hover:dark:bg-slate-700 text-gray-500 dark:text-gray-300 text-sm " +
              focusStyles
        }
      >
        {children}
      </NavLink>
    </li>
  );
};

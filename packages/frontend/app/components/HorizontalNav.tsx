import { NavLink } from "@remix-run/react";

export interface HorizontalNavProps {
  children: React.ReactNode;
  label: string;
}

export const HorizontalNav = ({ children, label }: HorizontalNavProps) => {
  return (
    <nav aria-label={label} className="w-full dark:bg-slate-800 bg-white py-3">
      <ul className="overflow-x-scroll flex flex-row gap-4">{children}</ul>
    </nav>
  );
};

export interface NavItemProps {
  children: React.ReactNode;
  to: string;
}

export const NavItem = ({ children, to }: NavItemProps) => {
  return (
    <li>
      <NavLink
        to={to}
        end
        className={({ isActive }) =>
          isActive
            ? "h-8 block flex items-center rounded px-3 bg-indigo-100 text-indigo-700 dark:bg-slate-600 dark:text-slate-50 text-sm"
            : "h-8 block flex items-center rounded px-3 hover:bg-gray-100 hover:dark:bg-slate-700 active:bg-gray-200 active:dark:bg-slate-600 text-gray-500 dark:text-gray-300 text-sm"
        }
      >
        {children}
      </NavLink>
    </li>
  );
};

import { NavLink } from "@remix-run/react";

export interface HorizontalNavProps {
  children: React.ReactNode;
  label: string;
}

export const NavWrapper = ({ children, label }: HorizontalNavProps) => {
  return (
    <nav aria-label={label}>
      <ul className="flex flex-col gap-1">{children}</ul>
    </nav>
  );
};

export interface NavItemProps {
  children: React.ReactNode;
  to: string;
  icon?: React.ReactNode;
  onClick?: any;
}

export const NavItem = ({ children, to, onClick }: NavItemProps) => {
  return (
    <li>
      <NavLink
        to={to}
        end
        onClick={onClick}
        className={({ isActive }) =>
          isActive
            ? "h-8 block flex items-center lg:rounded px-4 bg-indigo-700 font-bold text-white lg:bg-indigo-100 lg:text-indigo-700 dark:bg-slate-600 lg:dark:text-white text-sm"
            : "h-8 block flex items-center lg:rounded px-4 hover:bg-gray-100 hover:dark:bg-slate-700 active:bg-gray-200 active:dark:bg-slate-700 text-gray-500 dark:text-gray-300 text-sm"
        }
      >
        <span>{children}</span>
      </NavLink>
    </li>
  );
};

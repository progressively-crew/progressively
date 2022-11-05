import { NavLink } from "@remix-run/react";

export interface HorizontalNavProps {
  children: React.ReactNode;
  label: string;
}

export const NavWrapper = ({ children, label }: HorizontalNavProps) => {
  return (
    <nav aria-label={label}>
      <ul className="flex flex-col">{children}</ul>
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
            ? "text-sm h-8 block flex items-center rounded px-4 bg-indigo-700 text-white lg:bg-indigo-100 lg:text-indigo-700 font-bold"
            : "text-sm h-8 block flex items-center rounded px-4 hover:bg-gray-100"
        }
      >
        <span>{children}</span>
      </NavLink>
    </li>
  );
};

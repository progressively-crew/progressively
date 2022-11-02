import { NavLink } from "@remix-run/react";
import { HStack } from "./HStack";

export interface HorizontalNavProps {
  children: React.ReactNode;
  label: string;
}

export const HorizontalNav = ({ children, label }: HorizontalNavProps) => {
  return (
    <nav aria-label={label}>
      <ul className="overflow-x-scroll flex gap-2 flex-col">{children}</ul>
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
            ? "h-10 block flex items-center rounded px-4 bg-indigo-100 text-indigo-700 font-bold"
            : "h-10 block flex items-center rounded px-4 hover:bg-gray-100"
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

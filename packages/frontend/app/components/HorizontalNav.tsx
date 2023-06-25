import { NavLink } from "@remix-run/react";
import { HStack } from "./HStack";

export interface HorizontalNavProps {
  children: React.ReactNode;
  label: string;
}

export interface HorizontalNavSectionProps {
  children: React.ReactNode;
  icon: React.ReactNode;
  title: string;
}

export const HorizontalNavSection = ({
  title,
  children,
  icon,
}: HorizontalNavSectionProps) => {
  return (
    <div className="">
      <h2 className="font-bold text-sm uppercase text-xs text-slate-500 tracking-tight pl-2">
        <div className="flex flex-row gap-4 items-center">
          <span className="text-lg h-6 flex flex-row items-center">{icon}</span>
          {title}
        </div>
      </h2>

      <ul className="flex flex-col gap-2 py-3">{children}</ul>
    </div>
  );
};

export const HorizontalNav = ({ children, label }: HorizontalNavProps) => {
  return (
    <nav aria-label={label} className="py-3">
      {children}
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
            ? "h-8 text-sm block flex items-center rounded px-3 bg-gray-200 text-gray-900 dark:bg-slate-600 dark:text-slate-50 " +
              focusStyles
            : "h-8 text-sm block flex items-center rounded px-3 text-gray-900 hover:bg-gray-100 hover:dark:bg-slate-700  dark:text-gray-300 " +
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

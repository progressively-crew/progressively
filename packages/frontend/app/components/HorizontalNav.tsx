import { NavLink } from "@remix-run/react";

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
    <div>
      <h2 className="font-bold text-sm uppercase text-xs text-slate-500 tracking-tight">
        <div className="flex flex-row gap-4 items-center">
          <span className="text-lg h-6 flex flex-row items-center">{icon}</span>
          {title}
        </div>
      </h2>

      <ul className="flex flex-col gap-2 py-3 px-1">{children}</ul>
    </div>
  );
};

export const HorizontalNav = ({ children, label }: HorizontalNavProps) => {
  return (
    <nav aria-label={label} className="py-3 px-1">
      {children}
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
            ? "h-10 block flex items-center rounded px-3 bg-gray-200 text-gray-700 dark:bg-slate-600 dark:text-slate-50 " +
              focusStyles
            : "h-10 block flex items-center rounded px-3 hover:bg-gray-100 hover:dark:bg-slate-700 text-gray-500 dark:text-gray-300 " +
              focusStyles
        }
      >
        {children}
      </NavLink>
    </li>
  );
};

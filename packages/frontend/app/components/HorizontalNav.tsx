import { NavLink } from "@remix-run/react";
import { useBillingInfo } from "~/modules/plans/hooks/useBillingInfo";
import { useIsSaas } from "~/modules/saas/contexts/useIsSaas";
import { Progress } from "./Progress";

export interface HorizontalNavProps {
  children: React.ReactNode;
  label: string;
}

export const HorizontalNav = ({ children, label }: HorizontalNavProps) => {
  const { activePlan, hitsForMonth } = useBillingInfo();
  const isSaas = useIsSaas();

  return (
    <nav aria-label={label}>
      <div className="flex flex-col">
        <ul className="overflow-x-scroll flex flex-col gap-4 py-3 px-1">
          {children}
        </ul>

        {isSaas && (
          <div className="hidden xl:block">
            <Progress
              max={activePlan?.evaluationCount || 1000}
              value={hitsForMonth}
              label={"Evaluation count this month"}
            />
          </div>
        )}
      </div>
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

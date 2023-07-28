import { User } from "~/modules/user/types";
import { Button } from "~/components/Buttons/Button";
import { Logo } from "~/components/Logo/Logo";
import { useBillingInfo } from "~/modules/plans/hooks/useBillingInfo";
import { useIsSaas } from "~/modules/saas/contexts/useIsSaas";
import { Progress } from "~/components/Progress";

export interface UserDropdownProps {
  user: User;
}

export const UserDropdown = ({ user }: UserDropdownProps) => {
  const { activePlan, hitsForMonth } = useBillingInfo();
  const isSaas = useIsSaas();

  return (
    <nav
      aria-label="User related"
      className="flex flex-row gap-2 items-center justify-between"
    >
      <div className="flex flex-row gap-2 items-center">
        <Button to="/dashboard" variant="tertiary-inverse">
          <Logo aria-label="Progressively project list" />
        </Button>
      </div>

      <div className="flex flex-row gap-2 items-center">
        {isSaas && (
          <div className="hidden xl:block text-white">
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

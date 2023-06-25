import { User } from "~/modules/user/types";
import { Avatar } from "~/components/Avatar";
import { Button } from "~/components/Buttons/Button";
import { CreateButton } from "~/components/Buttons/CreateButton";
import { useProject } from "~/modules/projects/contexts/useProject";
import { FeedbackFish } from "@feedback-fish/react";
import { GoCommentDiscussion } from "react-icons/go";
import { Logo } from "~/components/Logo/Logo";
import { useBillingInfo } from "~/modules/plans/hooks/useBillingInfo";
import { useIsSaas } from "~/modules/saas/contexts/useIsSaas";
import { Progress } from "~/components/Progress";

export interface UserDropdownProps {
  user: User;
}

export const UserDropdown = ({ user }: UserDropdownProps) => {
  const { project } = useProject();
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

        <div className="hidden md:block">
          <Button
            href="https://docs.progressively.app/"
            variant="tertiary-inverse"
            target="_blank"
          >
            Documentation
          </Button>
        </div>
      </div>

      <div className="flex flex-row gap-2 items-center">
        {project && (
          <CreateButton
            to={`/dashboard/projects/${project.uuid}/flags/create`}
            variant="tertiary-inverse"
          >
            Add a feature flag
          </CreateButton>
        )}

        <div className="hidden md:block">
          <FeedbackFish projectId="012aac85b784ee">
            <Button variant="tertiary-inverse" icon={<GoCommentDiscussion />}>
              Send feedback
            </Button>
          </FeedbackFish>
        </div>

        {isSaas && (
          <div className="hidden xl:block text-white">
            <Progress
              max={activePlan?.evaluationCount || 1000}
              value={hitsForMonth}
              label={"Evaluation count this month"}
            />
          </div>
        )}

        <Button
          to="/dashboard/profile"
          className="text-sm"
          icon={<Avatar aria-hidden>{user.fullname}</Avatar>}
          variant="tertiary-inverse"
        >
          <span className="sr-only">{user.fullname}</span>
        </Button>
      </div>
    </nav>
  );
};

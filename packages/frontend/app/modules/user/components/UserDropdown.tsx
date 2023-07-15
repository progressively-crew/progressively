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
import { IconButton } from "~/components/Buttons/IconButton";
import { Tooltip } from "~/components/Tooltip/Tooltip";
import { FaBook } from "react-icons/fa";

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

        {project && (
          <CreateButton
            to={`/dashboard/projects/${project.uuid}/flags/create`}
            variant="secondary-inverse"
          >
            Add a feature flag
          </CreateButton>
        )}
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

        <div className="hidden md:block ">
          <Tooltip tooltip={"Open documentation"}>
            <Button
              href="https://docs.progressively.app/"
              variant="tertiary-inverse"
              target="_blank"
            >
              <FaBook aria-label="Documentation" className="text-xl" />
            </Button>
          </Tooltip>
        </div>

        <div className="hidden md:block text-xl">
          <FeedbackFish projectId="012aac85b784ee">
            <IconButton
              icon={<GoCommentDiscussion />}
              tooltip={"Send feedback"}
              variant="inverse"
              size="L"
            />
          </FeedbackFish>
        </div>

        <Tooltip tooltip={"See profile"}>
          <Button
            to="/dashboard/profile"
            className="text-sm"
            icon={<Avatar aria-hidden>{user.fullname}</Avatar>}
            variant="tertiary-inverse"
          >
            <span className="sr-only">{user.fullname}</span>
          </Button>
        </Tooltip>
      </div>
    </nav>
  );
};

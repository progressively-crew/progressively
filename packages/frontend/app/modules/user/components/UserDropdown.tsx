import { User } from "~/modules/user/types";
import { Avatar } from "~/components/Avatar";
import { Button } from "~/components/Buttons/Button";
import { CreateButton } from "~/components/Buttons/CreateButton";
import { useProject } from "~/modules/projects/contexts/useProject";

export interface UserDropdownProps {
  user: User;
}

export const UserDropdown = ({ user }: UserDropdownProps) => {
  const { project } = useProject();

  return (
    <nav
      aria-label="User related"
      className="hidden lg:flex flex-row gap-2 items-center "
    >
      {project && (
        <CreateButton
          to={`/dashboard/projects/${project.uuid}/flags/create`}
          variant="tertiary"
        >
          Add a feature flag
        </CreateButton>
      )}

      <Button
        to="/dashboard/profile"
        className="text-sm"
        icon={<Avatar aria-hidden>{user.fullname}</Avatar>}
        variant="tertiary"
      >
        <span className="sr-only">{user.fullname}</span>
      </Button>
    </nav>
  );
};

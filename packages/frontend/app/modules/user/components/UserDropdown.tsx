import { User } from "~/modules/user/types";
import { Avatar } from "~/components/Avatar";
import { Button } from "~/components/Buttons/Button";

export interface UserDropdownProps {
  user: User;
}

export const UseDropdown = ({ user }: UserDropdownProps) => {
  return (
    <nav aria-label="General">
      <Button
        to="/profile"
        icon={<Avatar aria-hidden>{user.fullname}</Avatar>}
        variant="tertiary"
      >
        {user.fullname}
      </Button>
    </nav>
  );
};

import { User } from "~/modules/user/types";
import { Avatar } from "~/components/Avatar";
import { Button } from "~/components/Buttons/Button";

export interface UserDropdownProps {
  user: User;
}

export const UseDropdown = ({ user }: UserDropdownProps) => {
  return (
    <Button
      to="/profile"
      icon={<Avatar aria-hidden>{user.fullname}</Avatar>}
      variant="tertiary"
      scheme="inverse"
    >
      {user.fullname}
    </Button>
  );
};

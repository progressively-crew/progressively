import { User } from "~/modules/user/types";
import { Avatar } from "~/components/Avatar";
import { Button } from "~/components/Buttons/Button";
import { HideMobile } from "~/components/HideMobile";

export interface UserDropdownProps {
  user: User;
}

export const UseDropdown = ({ user }: UserDropdownProps) => {
  return (
    <nav aria-label="User related">
      <Button
        to="/profile"
        icon={<Avatar aria-hidden>{user.fullname}</Avatar>}
        variant="tertiary"
        aria-label={user.fullname}
      >
        <HideMobile>{user.fullname}</HideMobile>
      </Button>
    </nav>
  );
};

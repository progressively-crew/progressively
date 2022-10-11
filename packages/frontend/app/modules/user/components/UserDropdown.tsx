import { User } from "~/modules/user/types";
import { Avatar } from "~/components/Avatar";
import { Button } from "~/components/Buttons/Button";
import { styled } from "~/stitches.config";

export interface UserDropdownProps {
  user: User;
}

const HiddenMobile = styled("span", {
  "@mobile": {
    display: "none",
  },
});

export const UseDropdown = ({ user }: UserDropdownProps) => {
  return (
    <nav aria-label="User related">
      <Button
        to="/profile"
        icon={<Avatar aria-hidden>{user.fullname}</Avatar>}
        variant="tertiary"
        aria-label={user.fullname}
      >
        <HiddenMobile>{user.fullname}</HiddenMobile>
      </Button>
    </nav>
  );
};

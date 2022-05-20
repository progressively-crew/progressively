import { BiCaretDown } from "react-icons/bi";
import { Link } from "remix";
import { User } from "~/modules/user/types";
import { VisuallyHidden } from "~/components/VisuallyHidden";
import { Button } from "~/components/Button";

export interface UserDropdownProps {
  user: User;
}

export const UseDropdown = ({ user }: UserDropdownProps) => {
  return (
    <Button
      size="lg"
      as={Link}
      to="/profile"
      variant="ghost"
      paddingInlineEnd={[0, 4]}
      rightIcon={<BiCaretDown />}
    >
      {user.fullname}

      <span aria-hidden>{user.fullname.substring(0, 1)}</span>
      <VisuallyHidden>{user.fullname}</VisuallyHidden>
    </Button>
  );
};

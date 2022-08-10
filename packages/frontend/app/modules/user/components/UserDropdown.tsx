import { User } from "~/modules/user/types";
import { Link } from "~/components/Link";
import { Avatar } from "~/components/Avatar";
import { VisuallyHidden } from "~/components/VisuallyHidden";
import { HideTablet } from "~/components/HideMobile";
import { HStack } from "~/components/HStack";

export interface UserDropdownProps {
  user: User;
}

export const UseDropdown = ({ user }: UserDropdownProps) => {
  return (
    <Link
      to="/profile"
      color="heracles"
      active="hermes"
      style={{ textDecoration: "none" }}
      fontSize="uranus"
    >
      <HStack spacing={2}>
        <Avatar>{user.fullname}</Avatar>
        <VisuallyHidden>{user.fullname}</VisuallyHidden>
        <HideTablet aria-hidden>{user.fullname}</HideTablet>
      </HStack>
    </Link>
  );
};

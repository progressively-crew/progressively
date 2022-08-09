import { User } from "~/modules/user/types";
import { Link } from "~/components/Link";
import { Avatar } from "~/components/Avatar";
import { VisuallyHidden } from "~/components/VisuallyHidden";
import { HideMobile } from "~/components/HideMobile";
import { HStack } from "~/components/HStack";
import { styled } from "~/stitches.config";

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
    >
      <HStack spacing={2}>
        <Avatar>{user.fullname}</Avatar>
        <VisuallyHidden>{user.fullname}</VisuallyHidden>
        <HideMobile aria-hidden>{user.fullname}</HideMobile>
      </HStack>
    </Link>
  );
};

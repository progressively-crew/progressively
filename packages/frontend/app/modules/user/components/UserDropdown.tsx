import { User } from "~/modules/user/types";
import { Link } from "~/components/Link";
import { Avatar } from "~/components/Avatar";
import { styled } from "~/stitches.config";
import { VisuallyHidden } from "~/components/VisuallyHidden";
import { HideMobile } from "~/components/HideMobile";
import { HStack } from "~/components/HStack";

const UserLink = styled(Link, {
  textDecoration: "none",
});

export interface UserDropdownProps {
  user: User;
}

export const UseDropdown = ({ user }: UserDropdownProps) => {
  return (
    <UserLink to="/profile">
      <HStack spacing={2}>
        <Avatar>{user.fullname}</Avatar>
        <VisuallyHidden>{user.fullname}</VisuallyHidden>
        <HideMobile as="span" aria-hidden className="fullname">
          {user.fullname}
        </HideMobile>
      </HStack>
    </UserLink>
  );
};

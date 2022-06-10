import { User } from "~/modules/user/types";
import { Link } from "~/components/Link";
import { Avatar } from "~/components/Avatar";
import { styled } from "~/stitches.config";
import { VisuallyHidden } from "~/components/VisuallyHidden";
import { HideMobile } from "~/components/HideMobile";

const Wrapper = styled("span", {
  display: "flex",
  gap: "$spacing$2",
  alignItems: "center",
  fontSize: "$btn",
});

export interface UserDropdownProps {
  user: User;
}

export const UseDropdown = ({ user }: UserDropdownProps) => {
  return (
    <Link to="/profile">
      <Wrapper>
        <Avatar>{user.fullname}</Avatar>
        <VisuallyHidden>{user.fullname}</VisuallyHidden>
        <HideMobile as="span" aria-hidden className="fullname">
          {user.fullname}
        </HideMobile>
      </Wrapper>
    </Link>
  );
};

import { User } from "~/modules/user/types";
import { Link } from "~/components/Link";
import { Avatar } from "~/components/Avatar";
import { styled } from "~/stitches.config";
import { VisuallyHidden } from "~/components/VisuallyHidden";

const Wrapper = styled("span", {
  display: "flex",
  gap: "$spacing$2",
  alignItems: "center",
  fontSize: "$btn",

  "& .fullname": {
    "@mobile": {
      display: "none",
    },
  },
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
        <span aria-hidden className="fullname">
          {user.fullname}
        </span>
      </Wrapper>
    </Link>
  );
};

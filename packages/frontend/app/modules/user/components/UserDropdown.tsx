import { User } from "~/modules/user/types";
import { Link } from "~/components/Link";
import { Avatar } from "~/components/Avatar";
import { styled } from "~/stitches.config";

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
        {user.fullname}
      </Wrapper>
    </Link>
  );
};

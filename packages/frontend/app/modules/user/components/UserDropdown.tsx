import { User } from "~/modules/user/types";
import { Link } from "~/components/Link";

export interface UserDropdownProps {
  user: User;
}

export const UseDropdown = ({ user }: UserDropdownProps) => {
  return <Link to="/profile">{user.fullname}</Link>;
};

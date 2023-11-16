import { TbUserEdit } from "react-icons/tb/index.js";
import { HorizontalNav, NavItem } from "~/components/HorizontalNav";

export interface FlagMenuProps {
  projectId: string;
  envId: string;
  flagId: string;
}

export const UserMenu = () => {
  return (
    <HorizontalNav label={"Navigate in user's profile"}>
      <NavItem to="/dashboard/profile" icon={<TbUserEdit />}>
        General
      </NavItem>
    </HorizontalNav>
  );
};

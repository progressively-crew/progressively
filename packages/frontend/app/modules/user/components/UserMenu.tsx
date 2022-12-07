import { FaToggleOff } from "react-icons/fa";
import { HorizontalNav, NavItem } from "~/components/HorizontalNav";

import { VariantIcon } from "~/components/Icons/VariantIcon";

export interface FlagMenuProps {
  projectId: string;
  envId: string;
  flagId: string;
}

export const UserMenu = () => {
  return (
    <HorizontalNav label={`Flag related`}>
      <NavItem to={`#password`} icon={<FaToggleOff />}>
        Change password
      </NavItem>

      <NavItem to={`/`} icon={<VariantIcon />}>
        Logout
      </NavItem>
    </HorizontalNav>
  );
};

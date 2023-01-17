import { HorizontalNav, NavItem } from "~/components/HorizontalNav";

export interface FlagMenuProps {
  projectId: string;
  envId: string;
  flagId: string;
}

export const UserMenu = () => {
  return (
    <HorizontalNav label={`Flag related`}>
      <NavItem to={`#password`}>Password</NavItem>

      <NavItem to={`#logout`}>Logout</NavItem>
    </HorizontalNav>
  );
};

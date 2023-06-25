import {
  HorizontalNav,
  HorizontalNavSection,
  NavItem,
} from "~/components/HorizontalNav";
import { UserIcon } from "~/components/Icons/UserIcon";
import { useIsSaas } from "~/modules/saas/contexts/useIsSaas";

export interface FlagMenuProps {
  projectId: string;
  envId: string;
  flagId: string;
}

export const UserMenu = () => {
  const isSaas = useIsSaas();

  return (
    <HorizontalNav label={"Navigate in user's profile"}>
      <HorizontalNavSection
        icon={<UserIcon />}
        title="Navigate in user's profile"
      >
        <NavItem to="/dashboard/profile">General</NavItem>

        {isSaas && <NavItem to="/dashboard/profile/billing">Billing</NavItem>}
      </HorizontalNavSection>
    </HorizontalNav>
  );
};

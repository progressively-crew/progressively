import { HorizontalNav, NavItem } from "~/components/HorizontalNav";
import { useIsSaas } from "~/modules/saas/contexts/useIsSaas";

export interface FlagMenuProps {
  projectId: string;
  envId: string;
  flagId: string;
}

export const UserMenu = () => {
  const isSaas = useIsSaas();

  return (
    <HorizontalNav label={`Flag related`}>
      <NavItem to="/dashboard/profile">General</NavItem>

      {isSaas && <NavItem to="/dashboard/profile/billing">Billing</NavItem>}
    </HorizontalNav>
  );
};

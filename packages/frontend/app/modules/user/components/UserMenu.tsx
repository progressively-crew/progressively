import { useFlags } from "@progressively/react";
import { HorizontalNav, NavItem } from "~/components/HorizontalNav";

export interface FlagMenuProps {
  projectId: string;
  envId: string;
  flagId: string;
}

export const UserMenu = () => {
  const { flags } = useFlags();

  return (
    <HorizontalNav label={`Flag related`}>
      <NavItem to="/dashboard/profile">General</NavItem>
      {flags.pricingPage && (
        <NavItem to="/dashboard/profile/billing">Billing</NavItem>
      )}
    </HorizontalNav>
  );
};

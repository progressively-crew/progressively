import { TbCurrencyDollar, TbUserEdit } from "react-icons/tb";
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
    <div className="pt-4">
      <HorizontalNav label={"Navigate in user's profile"}>
        <NavItem to="/dashboard/profile" icon={<TbUserEdit />}>
          General
        </NavItem>

        {isSaas && (
          <NavItem to="/dashboard/profile/billing" icon={<TbCurrencyDollar />}>
            Billing
          </NavItem>
        )}
      </HorizontalNav>
    </div>
  );
};

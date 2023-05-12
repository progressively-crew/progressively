import { useIsSaas } from "~/modules/saas/contexts/useIsSaas";
import { useBillingInfo } from "./useBillingInfo";
import { useProject } from "~/modules/projects/contexts/useProject";
import { UserRoles } from "~/modules/projects/types";

export const useIsAuthorizedOnEnv = () => {
  const isSaas = useIsSaas();
  const { project, userRole } = useProject();
  const billingInfo = useBillingInfo();

  // Self hosted, do whatever you want
  if (!isSaas) {
    return true;
  }

  if (userRole !== UserRoles.Admin) {
    return false;
  }

  // SaaS with a paying subscriber
  if (billingInfo.activePlan) {
    return (
      billingInfo.activePlan.environmentCount > project.environments.length
    );
  }

  return false;
};

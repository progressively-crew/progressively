import { useProjects } from "~/modules/projects/contexts/useProjects";
import { useIsSaas } from "~/modules/saas/contexts/useIsSaas";
import { useBillingInfo } from "./useBillingInfo";

export const useIsAuthorizedOnProject = () => {
  const isSaas = useIsSaas();
  const { projects } = useProjects();
  const billingInfo = useBillingInfo();

  // Self hosted, do whatever you want
  if (!isSaas) {
    return true;
  }

  // SaaS with a paying subscriber
  if (billingInfo.activePlan) {
    return billingInfo.activePlan.projectCount > projects.length;
  }

  //SaaS with a valid trial period
  if (billingInfo.remainingTrialingDays > 0) {
    return projects.length === 0;
  }

  return false;
};

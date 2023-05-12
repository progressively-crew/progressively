import { useIsSaas } from "~/modules/saas/contexts/useIsSaas";

export const useIsAuthorized = () => {
  const isSaas = useIsSaas();

  if (!isSaas) {
    return true;
  }
};

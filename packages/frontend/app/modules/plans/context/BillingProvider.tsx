import { BillingInfo } from "../types";
import { BillingContext } from "./BillingContext";

export interface BillingProviderProps {
  children: React.ReactNode;
  billingInfo: BillingInfo;
}

export const BillingProvider = ({
  children,
  billingInfo,
}: BillingProviderProps) => {
  return (
    <BillingContext.Provider value={billingInfo}>
      {children}
    </BillingContext.Provider>
  );
};

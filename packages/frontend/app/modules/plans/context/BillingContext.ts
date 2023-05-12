import { createContext } from "react";
import { BillingInfo } from "../types";

export const BillingContext = createContext<BillingInfo>({
  plans: [],
  activePlan: undefined,
  remainingTrialingDays: 0,
});

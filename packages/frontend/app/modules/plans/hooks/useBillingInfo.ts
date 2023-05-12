import { useContext } from "react";
import { BillingContext } from "../context/BillingContext";

export const useBillingInfo = () => useContext(BillingContext);

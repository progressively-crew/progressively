import { createContext } from "react";
import { AdditionalAudienceRetrieveDTO } from "../types";

export interface StrategyContextType {
  strategy: AdditionalAudienceRetrieveDTO;
}

export const StrategyContext = createContext<StrategyContextType>({});

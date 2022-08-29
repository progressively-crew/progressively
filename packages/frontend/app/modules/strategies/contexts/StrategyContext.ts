import { createContext } from "react";
import { StrategyRetrieveDTO } from "../types";

export interface StrategyContextType {
  strategy: StrategyRetrieveDTO;
}

export const StrategyContext = createContext<StrategyContextType>({});

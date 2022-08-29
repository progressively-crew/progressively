import { StrategyRetrieveDTO } from "../types";
import { StrategyContext } from "./StrategyContext";

export interface StrategyProviderProps {
  children: React.ReactNode;
  strategy: StrategyRetrieveDTO;
}

export const StrategyProvider = ({
  children,
  strategy,
}: StrategyProviderProps) => {
  return (
    <StrategyContext.Provider value={{ strategy }}>
      {children}
    </StrategyContext.Provider>
  );
};

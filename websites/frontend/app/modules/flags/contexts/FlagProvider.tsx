import { FlagWithEnvs } from "../types";
import { FlagContext } from "./FlagContext";

export interface FlagProviderProps {
  children: React.ReactNode;
  flag: FlagWithEnvs;
}

export const FlagProvider = ({ children, flag }: FlagProviderProps) => {
  return (
    <FlagContext.Provider value={{ flag }}>{children}</FlagContext.Provider>
  );
};

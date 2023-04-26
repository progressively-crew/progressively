import { Flag } from "../types";
import { FlagContext } from "./FlagContext";

export interface FlagProviderProps {
  children: React.ReactNode;
  flag: Flag;
}

export const FlagProvider = ({ children, flag }: FlagProviderProps) => {
  return (
    <FlagContext.Provider value={{ flag }}>{children}</FlagContext.Provider>
  );
};

import { FlagEnv } from "../types";
import { FlagEnvContext } from "./FlagEnvContext";

export interface FlagEnvProviderProps {
  children: React.ReactNode;
  flagEnv: FlagEnv;
}

export const FlagEnvProvider = ({
  children,
  flagEnv,
}: FlagEnvProviderProps) => {
  return (
    <FlagEnvContext.Provider value={{ flagEnv }}>
      {children}
    </FlagEnvContext.Provider>
  );
};

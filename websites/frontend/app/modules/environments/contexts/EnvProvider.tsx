import { Environment } from "../types";
import { EnvContext } from "./EnvContext";

export interface ProjectProviderProps {
  children: React.ReactNode;
  environment: Environment;
}

export const EnvProvider = ({
  children,
  environment,
}: ProjectProviderProps) => {
  return (
    <EnvContext.Provider value={{ environment }}>
      {children}
    </EnvContext.Provider>
  );
};

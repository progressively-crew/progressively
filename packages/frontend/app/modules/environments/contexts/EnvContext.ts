import { createContext } from "react";
import { Environment } from "../types";

export interface EnvContextType {
  environment: Environment;
}

export const EnvContext = createContext<EnvContextType>({});

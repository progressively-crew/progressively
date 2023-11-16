import { createContext } from "react";
import { FlagEnv } from "../types";

export interface FlagEnvContextType {
  flagEnv: FlagEnv;
}

export const FlagEnvContext = createContext<FlagEnvContextType>({});

import { createContext } from "react";
import { FlagWithEnvs } from "../types";

export interface FlagContextType {
  flag: FlagWithEnvs;
}

export const FlagContext = createContext<FlagContextType>({});

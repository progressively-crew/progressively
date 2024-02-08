import { createContext } from "react";
import { Flag } from "../types";

export interface FlagContextType {
  flag: Flag;
}

export const FlagContext = createContext<{ flag: Flag }>({ flag: {} });

import { createContext } from "react";
import { FlagDict, StateMachineConstants } from "./types";

export interface ProgressivelyContextType {
  flags: FlagDict;
  isLoading: boolean;
  status: StateMachineConstants;
  error?: Error;
}

export const ProgressivelyContext = createContext<ProgressivelyContextType>({
  flags: {},
  isLoading: false,
  status: "idle",
  error: undefined,
});

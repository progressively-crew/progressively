import { FlagDict } from "@progressively/sdk-js";
import { createContext } from "react";

export interface ProgressivelyContextType {
  flags: FlagDict;
  isLoading: boolean;
  error?: Error;
}

export const ProgressivelyContext = createContext<ProgressivelyContextType>({
  flags: {},
  isLoading: false,
  error: undefined,
});

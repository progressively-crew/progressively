import { Fields, FlagDict } from "@progressively/sdk-js";
import { createContext } from "react";
import { StateMachineConstants } from "./types";

export interface ProgressivelyContextType {
  flags: FlagDict;
  isLoading: boolean;
  status: StateMachineConstants;
  error?: Error;
  track: (eventName?: string) => Promise<void>;
  setFields: (newFields: Fields) => void;
}

export const ProgressivelyContext = createContext<ProgressivelyContextType>({
  flags: {},
  isLoading: false,
  status: "idle",
  error: undefined,
  track: () => {
    return {} as any;
  },
  setFields: () => {
    return {};
  },
});

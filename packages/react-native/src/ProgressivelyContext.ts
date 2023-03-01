import { createContext } from "react";
import { Fields, FlagDict, StateMachineConstants } from "./types";

export interface ProgressivelyContextType {
  flags: FlagDict;
  isLoading: boolean;
  status: StateMachineConstants;
  error?: Error;
  track: (eventName: string) => Promise<void>;
  setFields: (newFields: Fields, ctrl?: AbortController | undefined) => void;
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

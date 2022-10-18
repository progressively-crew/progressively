import { FlagDict } from "@progressively/sdk-js";
import { createContext } from "react";

export interface ProgressivelyContextType {
  flags: FlagDict;
  isLoading: boolean;
  error?: Error;
  track: (eventName: string, data: any) => Promise<Response>;
}

export const ProgressivelyContext = createContext<ProgressivelyContextType>({
  flags: {},
  isLoading: false,
  error: undefined,
  track: () => {
    return {} as any;
  },
});

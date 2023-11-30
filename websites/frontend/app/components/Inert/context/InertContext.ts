import { createContext } from "react";

export interface InertContextType {
  setInert: (x: boolean) => void;
  inert: boolean;
}

export const InertContext = createContext<InertContextType>({
  inert: false,
  setInert: () => {},
});

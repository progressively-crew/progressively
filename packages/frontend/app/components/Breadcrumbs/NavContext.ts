import { createContext } from "react";

export interface NavContextTypes {
  toggleNav: () => void;
  isNavOpened: boolean;
}

export const NavContext = createContext<NavContextTypes>({
  toggleNav: () => undefined,
  isNavOpened: false,
});

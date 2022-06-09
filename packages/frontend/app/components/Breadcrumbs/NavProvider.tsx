import { useState } from "react";
import { NavContext } from "./NavContext";

export interface NavProviderProps {
  children: React.ReactNode;
}

export const NavProvider = ({ children }: NavProviderProps) => {
  const [isNavOpened, setIsNavOpened] = useState(false);

  const toggleNav = () => {
    setIsNavOpened((s) => !s);
  };

  return (
    <NavContext.Provider value={{ isNavOpened, toggleNav }}>
      {children}
    </NavContext.Provider>
  );
};

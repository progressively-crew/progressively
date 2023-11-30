import { useEffect, useState } from "react";
import { InertContext } from "../context/InertContext";

export interface InerProviderProps {
  children: React.ReactNode;
}

export const InertProvider = ({ children }: InerProviderProps) => {
  const [inert, setInert] = useState(false);

  useEffect(() => {
    document.body.style.overflow = inert ? "hidden" : "revert";
  }, [inert]);

  return (
    <InertContext.Provider value={{ inert, setInert }}>
      {children}
    </InertContext.Provider>
  );
};

import { useEffect } from "react";
import { useInert } from "./useInert";

export const useSetInert = () => {
  const { setInert } = useInert();

  useEffect(() => {
    setInert(true);

    return () => {
      setInert(false);
    };
  }, []);
};

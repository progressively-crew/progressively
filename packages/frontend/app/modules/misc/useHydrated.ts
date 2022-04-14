import { useEffect, useState } from "react";

// Putting this as global,
// We want this to resolve the fastest
// When it's true, it means that the component has already hydrated
let hydrated = false;

export const useHydrated = () => {
  const [isHydrated, setIsHydrated] = useState(hydrated);

  useEffect(() => {
    hydrated = true;
    setIsHydrated(true);
  }, []);

  return isHydrated;
};

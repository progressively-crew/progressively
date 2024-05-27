import { useEffect, useRef } from "react";

export const useScroll = (tickFn: (scrollFraction: number) => void) => {
  const tickFnRef = useRef(tickFn);

  tickFnRef.current = tickFn;

  useEffect(() => {
    const setupScroll = () => {
      const scrollPosition = window.scrollY;
      tickFnRef.current(scrollPosition);
    };

    const handleScroll = () => requestAnimationFrame(setupScroll);

    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);
};

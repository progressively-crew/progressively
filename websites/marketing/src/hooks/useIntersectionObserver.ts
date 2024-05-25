import { useState, useEffect, useRef } from "react";

export interface IntersectionObserverOptions extends IntersectionObserverInit {}

export const useIntersectionObserver = (
  options: IntersectionObserverOptions
) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    if (!divRef.current) return;

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        setIsIntersecting((s) => s || entry.isIntersecting);
      });
    };

    const observer = new IntersectionObserver(observerCallback, options);
    observer.observe(divRef.current);

    return () => {
      observer.disconnect();
    };
  }, [options]);

  return { isIntersecting, divRef };
};

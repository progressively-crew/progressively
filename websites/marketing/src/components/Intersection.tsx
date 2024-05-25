import type { ReactNode } from "react";
import {
  useIntersectionObserver,
  type IntersectionObserverOptions,
} from "../hooks/useIntersectionObserver";

export interface IntersectionProps extends IntersectionObserverOptions {
  children: ReactNode;
  animation: "fade-bottom";
}

const beforeAnimationClass = {
  "fade-bottom": "motion-safe:opacity-0 motion-safe:translate-y-8",
};

const afterAnimationClass = {
  "fade-bottom": "motion-safe:opacity-1 motion-safe:translate-y-0",
};

export const Intersection = ({
  children,
  animation,
  ...options
}: IntersectionProps) => {
  const prevAnim = beforeAnimationClass[animation];
  const afterAnim = afterAnimationClass[animation];

  const { isIntersecting, divRef } = useIntersectionObserver(options);

  return (
    <div
      ref={divRef}
      className={`transition-all duration-500 ${
        isIntersecting ? afterAnim : prevAnim
      }`}
    >
      {children}
    </div>
  );
};

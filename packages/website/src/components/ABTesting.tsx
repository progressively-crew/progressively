import { useRef } from "react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { AVersion, BVersion, CVersion } from "./Browser";
import { Code } from "./Code";

export const ABTesting = ({ code }: { code: string }) => {
  const variantTextClass = "text-center font-bold text-xl pt-4";
  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, {
    threshold: 0.75,
    freezeOnceVisible: true,
  });
  const isVisible = !!entry?.isIntersecting;

  const animationClass = isVisible
    ? `animate-fade-enter-left opacity-0`
    : "opacity-0";

  return (
    <div>
      <div className="max-w-screen-lg mx-auto w-full">
        <p className="text-lg leading-relaxed pb-4 text-slate-500">
          Unleash the power of dynamic feature flags by crafting multiple
          captivating variants that deliver diverse experiences to your users.
          Gauge the impact of these distinct versions and make data-driven
          decisions to elevate and optimize your apps for unprecedented success!
        </p>
      </div>

      <div className="grid md:grid-cols-[2fr_1fr] gap-4 items-center">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pb-4" ref={ref}>
          <div className={animationClass} style={{ animationDelay: "500ms" }}>
            <AVersion />
            <p className={variantTextClass}>Version A</p>
          </div>
          <div className={animationClass} style={{ animationDelay: "300ms" }}>
            <BVersion />
            <p className={variantTextClass}>Version B</p>
          </div>
          <div className={`${animationClass} hidden md:block`}>
            <CVersion />
            <p className={variantTextClass}>Version C</p>
          </div>
        </div>

        <div className="hidden md:block">
          <Code html={code} />
        </div>
      </div>
    </div>
  );
};

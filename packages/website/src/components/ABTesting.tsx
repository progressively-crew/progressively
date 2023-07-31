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
    <div className="bg-white">
      <div className="px-4 md:px-8 max-w-6xl mx-auto">
        <section className={"py-12 md:py-32"}>
          <h2 className="font-extrabold text-3xl md:text-7xl pb-4">
            Multi-variants
            <br /> and A/B testing
          </h2>

          <p className="text-xl md:text-2xl leading-relaxed pb-4">
            Create multiple variants for a given feature flag and provide
            different experiences to your users. Measure the impact of the
            different versions and makes decisions to improve your apps.
          </p>

          <div className="grid md:grid-cols-[2fr_1fr] gap-4 items-center">
            <div
              className="grid grid-cols-2 md:grid-cols-3 gap-4 pb-4"
              ref={ref}
            >
              <div
                className={animationClass}
                style={{ animationDelay: "500ms" }}
              >
                <AVersion />
                <p className={variantTextClass}>Version A</p>
              </div>
              <div
                className={animationClass}
                style={{ animationDelay: "300ms" }}
              >
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
        </section>
      </div>
    </div>
  );
};

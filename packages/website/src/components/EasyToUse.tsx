import { useRef } from "react";
import sprinkle from "../images/Sprinkle.svg";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

export interface Props {
  provider: string;
  clientComponent: string;
}

export const EasyToUse = ({ provider, clientComponent }: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, {
    freezeOnceVisible: true,
    threshold: 0.75,
  });
  const isVisible = !!entry?.isIntersecting;

  const codeClass =
    "leading-relaxed h-full block text-slate-100 bg-slate-800 px-4 rounded-lg border border-slate-700 text-xs overflow-x-scroll md:overflow-hidden";

  const preClass = "h-[260px] overflow-hidden md:overflow-visible	";

  return (
    <section
      className="bg-slate-900 py-20 md:py-40"
      style={{
        backgroundImage: `url("${sprinkle}")`,
      }}
    >
      <div className="px-4 md:px-8 max-w-6xl mx-auto">
        <h2 className="font-extrabold text-4xl md:text-5xl pb-4 md:text-center text-white">
          With just a few lines of code
        </h2>

        <p className="text-2xl leading-relaxed md:text-center text-white pb-8">
          Check the following example using the React SDK with real-time
          updates.
        </p>

        <div
          className="grid md:grid-cols-2 gap-2 md:gap-8 items-center"
          ref={ref}
        >
          <div
            className={
              isVisible
                ? "animate-fade-enter-left opacity-0"
                : "motion-safe:opacity-0"
            }
          >
            <pre className={preClass}>
              <code
                dangerouslySetInnerHTML={{ __html: provider }}
                className={`${codeClass}`}
              />
            </pre>
          </div>

          <div
            className={
              isVisible
                ? "animate-fade-enter-right opacity-0"
                : "motion-safe:opacity-0"
            }
          >
            <pre className={preClass}>
              <code
                dangerouslySetInnerHTML={{ __html: clientComponent }}
                className={`${codeClass}`}
              />
            </pre>
          </div>
        </div>

        <div className="text-center pt-12">
          <a
            href="https://docs.progressively.app/sdks/react"
            target="_blank"
            className="text-white border border-slate-50 hover:bg-slate-800 px-6 py-3 whitespace-nowrap inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
          >
            Get started with React SDK
          </a>
        </div>
      </div>
    </section>
  );
};

import { useRef } from "react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { Code } from "./Code";

interface TimeFrameProps {
  cta: React.ReactNode;
  title: string;
  content: string;
  step: number;
  shouldAnimate: boolean;
}

const TimeFrame = ({
  cta,
  title,
  content,
  step,
  shouldAnimate,
}: TimeFrameProps) => {
  const titleClass = "font-bold text-xl px-8 text-center";
  const pClass = "text-slate-700 pb-4 px-8 text-center text-lg";

  const numberClass =
    "relative z-10 w-10 h-10 flex items-center justify-center rounded-full p-2";

  return (
    <li>
      <div>
        <div className="flex flex-col-reverse md:flex-col">
          <h3 className={titleClass}>{title}</h3>

          <div className="flex items-center relative justify-center py-4">
            <div className="hidden md:block border-t-4 border-dashed border-slate-300 absolute w-full" />

            <div className="relative">
              <span
                className={`absolute inline-flex h-full w-full rounded-full bg-fuchsia-400 opacity-75 ${
                  shouldAnimate ? "animate-ping" : ""
                }`}
                style={{
                  animationDelay:
                    step === 1 ? "0ms" : step === 2 ? "500ms" : "1000ms",
                  animationIterationCount: 1,
                }}
              />
              <span className={`${numberClass} bg-slate-900`}>{step}</span>
            </div>
          </div>
        </div>

        <p className={pClass}>{content}</p>
        <div className="px-8 text-center">{cta}</div>
      </div>
    </li>
  );
};

export const InstallationStep = ({ code }: { code: string }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, {
    threshold: 0.75,
    freezeOnceVisible: true,
  });
  const isVisible = !!entry?.isIntersecting;

  const btnClass =
    "px-6 py-2 whitespace-nowrap inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  const primaryClass = "bg-gray-800 text-white hover:bg-gray-500";

  const secondaryBtnClass =
    "bg-transparent border border-slate-200 hover:bg-slate-100";

  return (
    <div className="bg-slate-50 border-t border-b border-slate-200">
      <section className="px-4 md:px-8 max-w-6xl mx-auto py-20 md:py-32">
        <h2 className="font-extrabold text-3xl md:text-5xl pb-20 text-center">
          Dreaming of an amazing workflow?
        </h2>

        <div ref={ref}>
          <div className="relative flex flex-col justify-center">
            <ol className="grid md:grid-cols-3 gap-20 md:gap-0">
              <TimeFrame
                shouldAnimate={isVisible}
                cta={
                  <a
                    className={`${btnClass} ${primaryClass}`}
                    href="https://dashboard.progressively.app/register"
                  >
                    Create my account
                  </a>
                }
                title={"Create an account"}
                content={
                  "Create your account, your first project and your first feature flag."
                }
                step={1}
              />

              <TimeFrame
                shouldAnimate={isVisible}
                cta={
                  <a
                    className={`${btnClass} ${secondaryBtnClass}`}
                    href="https://docs.progressively.app/sdks/react"
                  >
                    Choose a SDK
                  </a>
                }
                title={"Choose a SDK"}
                content={"Choose a SDK, and install it in your project."}
                step={2}
              />

              <TimeFrame
                shouldAnimate={isVisible}
                cta={
                  <div className="text-left">
                    <Code html={code} />
                  </div>
                }
                title={"Evaluate your flag"}
                content={
                  "Create a condition in your components and toggle the flag in the dashboard."
                }
                step={3}
              />
            </ol>
          </div>
        </div>
      </section>
    </div>
  );
};

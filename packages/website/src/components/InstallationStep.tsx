import { useRef } from "react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { Code } from "./Code";
import { Highlight } from "./Highlight";
import { Card } from "./Card";
import { BsCheck } from "react-icons/bs";
import { GlowyLink } from "./GlowyLink";

interface TimeFrameProps {
  cta?: React.ReactNode;
  title: string;
  content: React.ReactNode;
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
  const pClass = "text-slate-500 pb-4 px-8";

  const numberClass =
    "relative z-10 w-10 h-10 flex items-center justify-center rounded-full p-2";

  return (
    <li className="h-full">
      <Card>
        <div className="flex md:flex-col">
          <h3 className={titleClass}>{title}</h3>

          <div className="flex items-center justify-center py-4">
            <div className="hidden md:block border-t-4 border-dashed border-slate-300 absolute w-full max-w-lg" />

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
              <span className={`${numberClass} bg-slate-900 text-white`}>
                {step}
              </span>
            </div>
          </div>
        </div>

        <div className={pClass}>{content}</div>
        <div className="px-8 text-center mt-auto">{cta}</div>
      </Card>
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
    "w-full px-6 py-2 whitespace-nowrap inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  const primaryClass = "bg-gray-800 text-white hover:bg-gray-500";

  const secondaryBtnClass =
    "bg-transparent border border-slate-200 hover:bg-slate-100";

  return (
    <div className="bg-slate-50 border-t border-b border-slate-200">
      <section className="px-4 md:px-8 max-w-6xl mx-auto py-20 md:py-32">
        <h2 className="font-extrabold text-3xl md:text-5xl pb-4 md:pb-20 text-center">
          Dreaming of an <Highlight>amazing workflow</Highlight>?
        </h2>

        <div ref={ref}>
          <div className="relative flex flex-col justify-center">
            <ol className="grid md:grid-cols-3 gap-4 md:gap-8">
              <TimeFrame
                shouldAnimate={isVisible}
                cta={
                  <GlowyLink href="https://dashboard.progressively.app/register">
                    Create my account
                  </GlowyLink>
                }
                title={"Create an account"}
                content={
                  <ol className="flex flex-col gap-2 py-4">
                    <li className="flex flex-row gap-2 items-center">
                      <BsCheck className="text-[#44BCFF]" /> Setup your account
                    </li>
                    <li className="flex flex-row gap-2 items-center">
                      <BsCheck className="text-[#44BCFF]" /> Create your first
                      project
                    </li>
                    <li className="flex flex-row gap-2 items-center">
                      <BsCheck className="text-[#44BCFF]" /> Create your first
                      flag
                    </li>
                  </ol>
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
                content={
                  <ol className="flex flex-col gap-2 py-4">
                    <li className="flex flex-row gap-2 items-center">
                      <BsCheck className="text-[#FF44EC]" /> Choose a SDK
                    </li>
                    <li className="flex flex-row gap-2 items-center">
                      <BsCheck className="text-[#FF44EC]" /> Install it
                    </li>
                    <li className="flex flex-row gap-2 items-center">
                      <BsCheck className="text-[#FF44EC]" /> Evaluate the flags
                    </li>
                  </ol>
                }
                step={2}
              />

              <TimeFrame
                shouldAnimate={isVisible}
                title={"Enjoy"}
                content={
                  <ol className="flex flex-col gap-2 py-4">
                    <li className="flex flex-row gap-2 items-center">
                      <BsCheck className="text-[#FF675E]" /> Get insights
                    </li>
                    <li className="flex flex-row gap-2 items-center">
                      <BsCheck className="text-[#FF675E]" /> Get feedbacks
                    </li>
                    <li className="flex flex-row gap-2 items-center">
                      <BsCheck className="text-[#FF675E]" /> Iterate fast
                    </li>
                  </ol>
                }
                step={3}
                cta={
                  <a
                    className={`${btnClass} ${secondaryBtnClass}`}
                    href="https://github.com/progressively-crew/progressively/stargazers"
                  >
                    Show support
                  </a>
                }
              />
            </ol>
          </div>
        </div>
      </section>
    </div>
  );
};

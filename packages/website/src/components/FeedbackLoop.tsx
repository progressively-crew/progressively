import { useState } from "react";
import { ABTesting } from "./ABTesting";
import { CanaryRelease } from "./CanaryRelease";
import { CorrelatePercentageError } from "./CorrelatePercentageError";
import { TimeBasedRollout } from "./TimeBasedRollout";
import { Highlight } from "./Highlight";

type Step = "release" | "ab" | "error" | "time";

export const FeedbackLoop = ({ abcVersions }: { abcVersions: string }) => {
  const [step, setStep] = useState<Step>("release");
  const buttonClass =
    "rounded-full py-1 px-3 block w-full text-left transition-all hover:bg-slate-100";

  const activeClass = "bg-slate-900 hover:bg-slate-800 text-white";

  return (
    <div className="">
      <div className="px-4 md:px-8 max-w-screen-xl mx-auto">
        <section className={"py-12 md:py-32"}>
          <h2 className="font-extrabold text-3xl md:text-5xl pb-4 text-center">
            Enhance <Highlight>the feedback loop</Highlight>
          </h2>

          <div className="pt-2 pb-4">
            <ul className="gap-2 flex flex-row flex-wrap justify-center max-w-screen-lg mx-auto w-full p-2 md:border md:border-slate-200 rounded-full">
              <li>
                <button
                  className={`${buttonClass} ${
                    step === "release" ? activeClass : ""
                  }`}
                  onClick={() => setStep("release")}
                >
                  Unlock Canary / Beta versions.
                </button>
              </li>
              <li>
                <button
                  className={`${buttonClass} ${
                    step === "ab" ? activeClass : ""
                  }`}
                  onClick={() => setStep("ab")}
                >
                  Multi-variants & A/B testing
                </button>
              </li>
              <li>
                <button
                  className={`${buttonClass} ${
                    step === "error" ? activeClass : ""
                  }`}
                  onClick={() => setStep("error")}
                >
                  Correlate rollout & error rising
                </button>
              </li>
              <li>
                <button
                  className={`${buttonClass} ${
                    step === "time" ? activeClass : ""
                  }`}
                  onClick={() => setStep("time")}
                >
                  Time based rollouts
                </button>
              </li>
            </ul>
          </div>

          {step === "release" && <CanaryRelease />}
          {step === "ab" && <ABTesting code={abcVersions} />}
          {step === "error" && <CorrelatePercentageError />}
          {step === "time" && <TimeBasedRollout />}
        </section>
      </div>
    </div>
  );
};

import { useState } from "react";
import { ABTesting } from "./ABTesting";
import { CanaryRelease } from "./CanaryRelease";
import { CorrelatePercentageError } from "./CorrelatePercentageError";
import { TimeBasedRollout } from "./TimeBasedRollout";

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
            Enhance the feedback loop
          </h2>

          <div className="flex justify-center pt-2 pb-8">
            <ul className="bg-white p-2 rounded-full inline-flex flex-row gap-2 border border-gray-200">
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

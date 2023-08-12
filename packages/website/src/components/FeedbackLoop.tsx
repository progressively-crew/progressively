import { useState } from "react";
import { ABTesting } from "./ABTesting";
import { CanaryRelease } from "./CanaryRelease";
import { CorrelatePercentageError } from "./CorrelatePercentageError";
import { TimeBasedRollout } from "./TimeBasedRollout";

type Step = "release" | "ab" | "error" | "time";

export const FeedbackLoop = ({ abcVersions }: { abcVersions: string }) => {
  const [step, setStep] = useState<Step>("release");
  const buttonClass =
    "rounded text-lg py-4 px-4 block w-full text-left hover:pl-8 transition-all hover:bg-slate-100";

  const activeClass =
    "bg-gradient-to-r from-slate-900 via-slate-800 to-fuchsia-900 text-white hover:bg-slate-800 pl-8";

  return (
    <div className="bg-gradient-to-t from-slate-900 via-slate-800 to-fuchsia-900 lg:h-[860px]">
      <div className="px-4 md:px-8 max-w-screen-2xl mx-auto">
        <section className={"py-12 md:py-32"}>
          <h2 className="font-extrabold text-3xl md:text-5xl pb-4 text-white">
            Enhance the feedback loop
          </h2>

          <div className="grid lg:grid-cols-[340px_1fr] gap-12 pt-4 md:pt-12">
            <div>
              <ul className="bg-white p-2 rounded-lg flex flex-col gap-2 border border-gray-200">
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
          </div>
        </section>
      </div>
    </div>
  );
};

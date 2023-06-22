import { useId, useState } from "react";
import { Prices, PriceIdToEvaluation } from "@progressively/shared";

export const PricingCalculator = () => {
  const id = useId();

  const [step, setStep] = useState(1);

  const flagCountSliderId = `flagcount-${id}`;

  const labelClassName = "block pb-2";
  const innerLabelClassName = "text-slate-500 font semibold";

  const currentPlan = Prices[step - 1];

  return (
    <div>
      <div aria-live="polite" className="text-center pb-16">
        <strong className="text-7xl">{currentPlan.price}</strong>
        <span className="text-4xl text-slate-500">/month</span>
      </div>

      <div>
        <label htmlFor={flagCountSliderId} className={labelClassName}>
          <span className={innerLabelClassName}>Events/month*</span>
          <span className="block font-bold text-4xl">{currentPlan.events}</span>
        </label>
        <input
          name="evaluationCount"
          type="range"
          min={1}
          step={1}
          max={8}
          id={flagCountSliderId}
          value={step}
          onChange={(e) => setStep(Number(e.target.value))}
        />
      </div>
    </div>
  );
};

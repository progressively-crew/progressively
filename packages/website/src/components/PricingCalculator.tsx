import { useId, useState } from "react";
import { FlagEvaluationTenKCost } from "@progressively/shared";

export const PricingCalculator = () => {
  const id = useId();

  const [evaluationCount, setEvaluationCount] = useState(10000);

  const flagCountSliderId = `flagcount-${id}`;

  const labelClassName = "block pb-2";
  const innerLabelClassName = "text-slate-500 font semibold";

  const total = FlagEvaluationTenKCost * (evaluationCount / 10_000);

  return (
    <div>
      <div aria-live="polite" className="text-center pb-16">
        <strong className="text-7xl">€{total}</strong>
        <span className="text-4xl text-slate-500">/month</span>
      </div>

      <div>
        <label htmlFor={flagCountSliderId} className={labelClassName}>
          <span className={innerLabelClassName}>Flag evaluations/month*</span>
          <span className="block font-bold text-4xl">{evaluationCount}</span>
        </label>
        <input
          name="evaluationCount"
          type="range"
          min={10000}
          step={10000}
          max={80000}
          id={flagCountSliderId}
          value={evaluationCount}
          onChange={(e) => setEvaluationCount(Number(e.target.value))}
        />
      </div>
    </div>
  );
};

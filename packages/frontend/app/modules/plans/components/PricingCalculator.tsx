import { useId } from "react";
import { Typography } from "~/components/Typography";
import { calculatePrice } from "@progressively/shared";

export interface PricingCalculatorProps {
  evaluationCount: number;
  onEvalCountChange: (n: number) => void;
}

export const PricingCalculator = ({
  evaluationCount,
  onEvalCountChange,
}: PricingCalculatorProps) => {
  const id = useId();

  const flagCountSliderId = `flagcount-${id}`;

  const total = calculatePrice(evaluationCount);

  const labelClassName = "block pb-2";
  const innerLabelClassName = "text-slate-500 font semibold";

  return (
    <div className="max-w-4xl mx-auto">
      <div aria-live="polite" className="text-center pb-16">
        <Typography as="strong" className="text-7xl">
          €{total}
        </Typography>
        <Typography as="span" className="text-4xl text-slate-500">
          /month
        </Typography>
      </div>

      <div>
        <label htmlFor={flagCountSliderId} className={labelClassName}>
          <Typography as="span" className={innerLabelClassName}>
            Flag evaluations/month*
          </Typography>
          <Typography as="span" className="block font-bold text-4xl">
            {evaluationCount}
          </Typography>
        </label>
        <input
          name="evaluationCount"
          type="range"
          min={10_000}
          step={10_000}
          max={80_000}
          id={flagCountSliderId}
          value={evaluationCount}
          onChange={(e) => onEvalCountChange(Number(e.target.value))}
        />
      </div>
    </div>
  );
};

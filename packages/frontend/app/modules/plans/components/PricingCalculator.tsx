import { Prices } from "@progressively/shared";
import { useId } from "react";
import { Typography } from "~/components/Typography";

export interface PricingCalculatorProps {
  evaluationCount: number;
  onEvalCountChange: (n: number) => void;
  price: string;
  step: number;
}

export const PricingCalculator = ({
  evaluationCount,
  onEvalCountChange,
  price,
  step,
}: PricingCalculatorProps) => {
  const id = useId();

  const flagCountSliderId = `flagcount-${id}`;

  return (
    <div className="max-w-2xl mx-auto">
      <div aria-live="polite" className="text-center pb-16">
        <Typography as="strong" className="text-7xl">
          {price}
        </Typography>
        <Typography as="span" className="text-4xl text-slate-500">
          /month
        </Typography>
      </div>

      <div>
        <label htmlFor={flagCountSliderId} className={"block pb-2"}>
          <Typography as="span" className={"text-slate-500 font semibold"}>
            Events/month
          </Typography>
        </label>

        <Typography className="text-4xl font-bold pb-4">
          {evaluationCount}
        </Typography>
        <input
          name="evaluationCount"
          type="range"
          min={1}
          step={1}
          max={Prices.length}
          id={flagCountSliderId}
          value={step}
          onChange={(e) => onEvalCountChange(Number(e.target.value))}
        />
      </div>
    </div>
  );
};

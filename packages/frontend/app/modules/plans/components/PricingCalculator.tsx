import { useId } from "react";
import { Typography } from "~/components/Typography";
import { Label } from "~/components/Fields/Label";
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
  const labelClassName = "block pb-2 text-sm";

  const total = calculatePrice(evaluationCount);

  return (
    <div className="px-16">
      <div className="pb-8">
        <div aria-live="polite" className="text-center pb-16">
          <Typography as="strong" className="text-7xl">
            €{total}
          </Typography>
          <Typography as="span" className="text-4xl text-slate-500">
            /month
          </Typography>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div>
            <Label htmlFor={flagCountSliderId} className={labelClassName}>
              Flag evaluations/month
            </Label>

            <Typography as="span" className="block font-bold text-4xl pb-4">
              {evaluationCount}
            </Typography>
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
      </div>
    </div>
  );
};

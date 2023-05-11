import { useId, useState } from "react";
import {
  EnvCost,
  FlagEvaluationTenKCost,
  ProjectCost,
} from "@progressively/shared";
import { Typography } from "~/components/Typography";
import { Label } from "~/components/Fields/Label";

export interface PricingCalculatorProps {
  initialProjectCount: number;
  initialEnvCount: number;
  initialEvaluationCount: number;
}

export const PricingCalculator = ({
  initialProjectCount,
  initialEnvCount,
  initialEvaluationCount,
}: PricingCalculatorProps) => {
  const id = useId();
  const [projectValue, setProjectValue] = useState(initialProjectCount);
  const [envValue, setEnvValue] = useState(initialEnvCount);
  const [evaluationCount, setEvaluationCount] = useState(
    initialEvaluationCount
  );

  const projectSliderId = `project-${id}`;
  const envSliderId = `env-${id}`;
  const flagCountSliderId = `flagcount-${id}`;

  const labelClassName = "block pb-2 text-sm";

  const total =
    ProjectCost * projectValue +
    EnvCost * envValue +
    FlagEvaluationTenKCost * (evaluationCount / 10_000);

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
            <Label htmlFor={projectSliderId} className={labelClassName}>
              Number of projects
            </Label>
            <Typography as="span" className="block font-bold text-4xl pb-4">
              {projectValue}
            </Typography>
            <input
              name="projectCount"
              type="range"
              min={1}
              max={10}
              id={projectSliderId}
              value={projectValue}
              onChange={(e) => setProjectValue(Number(e.target.value))}
            />
          </div>

          <div>
            <Label htmlFor={envSliderId} className={labelClassName}>
              Number of environments/project
            </Label>

            <Typography as="span" className="block font-bold text-4xl pb-4">
              {envValue}
            </Typography>

            <input
              name="envCount"
              type="range"
              min={1}
              max={10}
              id={envSliderId}
              value={envValue}
              onChange={(e) => setEnvValue(Number(e.target.value))}
            />
          </div>

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
              onChange={(e) => setEvaluationCount(Number(e.target.value))}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

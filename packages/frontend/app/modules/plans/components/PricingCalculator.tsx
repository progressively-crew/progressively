import { useId, useState } from "react";
import {
  EnvCost,
  FlagEvaluationTenKCost,
  ProjectCost,
} from "@progressively/shared";

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

  const labelClassName = "block pb-2 text-sm text-slate-500 font semibold";

  const total =
    ProjectCost * projectValue +
    EnvCost * envValue +
    FlagEvaluationTenKCost * (evaluationCount / 10_000);

  return (
    <div className="px-16">
      <div className="pb-8">
        <div aria-live="polite" className="text-center pb-16">
          <strong className="text-7xl">€{total}</strong>
          <span className="text-4xl text-slate-500">/month</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div>
            <label htmlFor={projectSliderId} className={labelClassName}>
              Number of projects
            </label>
            <span className="block font-bold text-4xl">{projectValue}</span>
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
            <label htmlFor={envSliderId} className={labelClassName}>
              Number of environments/project
            </label>

            <span className="block font-bold text-4xl">{envValue}</span>
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
            <label htmlFor={flagCountSliderId} className={labelClassName}>
              Flag evaluations/month
            </label>

            <span className="block font-bold text-4xl">{evaluationCount}</span>
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

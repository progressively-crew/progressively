import { useId, useState } from "react";
import {
  EnvCost,
  FlagEvaluationTenKCost,
  ProjectCost,
} from "@progressively/shared";

export const PricingCalculator = () => {
  const id = useId();
  const [projectValue, setProjectValue] = useState(1);
  const [envValue, setEnvValue] = useState(1);
  const [evaluationCount, setEvaluationCount] = useState(10_000);

  const projectSliderId = `project-${id}`;
  const envSliderId = `env-${id}`;
  const flagCountSliderId = `flagcount-${id}`;

  const labelClassName = "block pb-2";
  const innerLabelClassName = "text-slate-500 font semibold";

  const total =
    ProjectCost * projectValue +
    EnvCost * envValue +
    FlagEvaluationTenKCost * (evaluationCount / 10_000);

  return (
    <div className="bg-white rounded-lg drop-shadow-lg overflow-hidden">
      <div className="px-16 pt-16 pb-8 ">
        <div aria-live="polite" className="text-center pb-16">
          <strong className="text-7xl">€{total}</strong>
          <span className="text-4xl text-slate-500">/month</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div>
            <label htmlFor={projectSliderId} className={labelClassName}>
              <span className={innerLabelClassName}>Number of projects</span>
              <span className="block font-bold text-4xl">{projectValue}</span>
            </label>
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
              <span className={innerLabelClassName}>
                Number of environments/project
              </span>
              <span className="block font-bold text-4xl">{envValue}</span>
            </label>
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
              <span className={innerLabelClassName}>
                Flag evaluations/month*
              </span>
              <span className="block font-bold text-4xl">
                {evaluationCount}
              </span>
            </label>
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

      <div className="flex flex-row py-8 bg-slate-100 px-16 justify-between">
        <div>
          Price of 1 project: <strong>€{ProjectCost}/mo</strong>
        </div>
        <div>
          Price of 1 environment: <strong>€{EnvCost}/mo</strong>
        </div>
        <div>
          Price of 10000 flag evaluation:
          <strong>€{FlagEvaluationTenKCost}/mo</strong>
        </div>
      </div>
    </div>
  );
};

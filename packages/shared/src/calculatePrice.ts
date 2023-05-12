import { EnvCost, FlagEvaluationTenKCost, ProjectCost } from "./plans";

export const calculatePrice = (
  projectCount: number,
  envCount: number,
  evaluationCount: number
) => {
  return (
    ProjectCost * projectCount +
    EnvCost * envCount +
    FlagEvaluationTenKCost * (evaluationCount / 10_000)
  );
};

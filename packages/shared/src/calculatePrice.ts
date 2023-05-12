import { FlagEvaluationTenKCost } from "./plans";

export const calculatePrice = (evaluationCount: number) => {
  return FlagEvaluationTenKCost * (evaluationCount / 10_000);
};

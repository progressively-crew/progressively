import { StrategyCreateDTO } from "../types";

export const getStrategyMetaTitle = (parentsData: any): string => {
  const strategy: StrategyCreateDTO =
    parentsData[
      "routes/dashboard/projects/$id/environments/$env/flags/$flagId/strategies/$stratId"
    ].strategy;

  return strategy.name;
};

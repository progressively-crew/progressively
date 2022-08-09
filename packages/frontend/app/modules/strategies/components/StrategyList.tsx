import { StrategyRetrieveDTO } from "../types";
import { StrategyCard } from "./StrategyCard";

export interface StrategyListProps {
  strategies: Array<StrategyRetrieveDTO>;
  projectId: string;
  envId: string;
  flagId: string;
}

export const StrategyList = ({
  strategies,
  projectId,
  envId,
  flagId,
}: StrategyListProps) => {
  return (
    <div>
      {strategies.map((strat) => (
        <StrategyCard
          key={`${strat.uuid}`}
          projectId={projectId}
          envId={envId}
          flagId={flagId}
          strat={strat}
        />
      ))}
    </div>
  );
};

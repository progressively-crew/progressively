import { DeleteButton } from "~/components/Buttons/DeleteButton";
import { RawTable } from "~/components/RawTable";
import { VisuallyHidden } from "~/components/VisuallyHidden";
import { StrategyRetrieveDTO } from "../types";
import { StrategyTargeting } from "./StrategyTargeting";

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
    <RawTable>
      <thead>
        <tr>
          <th>Name</th>
          <th width="50%">Targeting</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {strategies.map((strat) => (
          <tr key={strat.uuid}>
            <td>{strat.name}</td>
            <td>
              <StrategyTargeting strat={strat} />
            </td>
            <td>
              <DeleteButton
                small
                to={`/dashboard/projects/${projectId}/environments/${envId}/flags/${flagId}/strategies/${strat.uuid}/delete`}
              >
                Remove<VisuallyHidden> {strat.name}</VisuallyHidden>
              </DeleteButton>
            </td>
          </tr>
        ))}
      </tbody>
    </RawTable>
  );
};

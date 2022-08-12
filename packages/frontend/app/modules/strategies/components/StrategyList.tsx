import { DeleteButton } from "~/components/Buttons/DeleteButton";
import { RawTable } from "~/components/RawTable";
import { Tag } from "~/components/Tag";
import { VisuallyHidden } from "~/components/VisuallyHidden";
import { StrategyRetrieveDTO } from "../types";
import { StrategyCriteria, StrategyTargeting } from "./StrategyCriteria";

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
          <th>Targeting</th>
          <th width="30%">Criteria</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {strategies.map((strat) => (
          <tr key={strat.uuid}>
            <td>{strat.name}</td>
            <td>
              <Tag>{strat.rolloutPercentage}%</Tag> of the audience
            </td>
            <td>
              <StrategyCriteria strat={strat} />
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

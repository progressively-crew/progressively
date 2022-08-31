import { AiOutlineEdit } from "react-icons/ai";
import { Button } from "~/components/Buttons/Button";
import { DeleteButton } from "~/components/Buttons/DeleteButton";
import { HStack } from "~/components/HStack";
import { RawTable } from "~/components/RawTable";
import { VisuallyHidden } from "~/components/VisuallyHidden";
import { StrategyRetrieveDTO } from "../types";
import { StrategyCriteria } from "./StrategyCriteria";

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
          <th width="50%">Criteria</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {strategies.map((strat) => (
          <tr key={strat.uuid}>
            <td>
              <div>{strat.name}</div>
            </td>

            <td>
              <StrategyCriteria strat={strat} />
            </td>

            <td>
              <HStack spacing={4}>
                <Button
                  variant="tertiary"
                  small
                  icon={<AiOutlineEdit />}
                  to={`/dashboard/projects/${projectId}/environments/${envId}/flags/${flagId}/strategies/${strat.uuid}/edit`}
                >
                  Edit<VisuallyHidden> {strat.name}</VisuallyHidden>
                </Button>

                <DeleteButton
                  variant="tertiary"
                  small
                  to={`/dashboard/projects/${projectId}/environments/${envId}/flags/${flagId}/strategies/${strat.uuid}/delete`}
                >
                  Remove<VisuallyHidden> {strat.name}</VisuallyHidden>
                </DeleteButton>
              </HStack>
            </td>
          </tr>
        ))}
      </tbody>
    </RawTable>
  );
};

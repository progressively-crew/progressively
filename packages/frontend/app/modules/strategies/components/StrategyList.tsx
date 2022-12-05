import { AiOutlineEdit } from "react-icons/ai";
import { Button } from "~/components/Buttons/Button";
import { DeleteButton } from "~/components/Buttons/DeleteButton";
import { HStack } from "~/components/HStack";
import { RawTable, Td, Th, Tr } from "~/components/RawTable";
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
    <RawTable aria-label="Strategies applied on this flag">
      <thead>
        <Tr>
          <Th>Criteria</Th>
          <Th>Actions</Th>
        </Tr>
      </thead>
      <tbody>
        {strategies.map((strat) => (
          <Tr key={strat.uuid}>
            <Td>
              <StrategyCriteria strat={strat} />
            </Td>

            <Td>
              <HStack spacing={4}>
                <Button
                  variant="secondary"
                  icon={<AiOutlineEdit />}
                  to={`/dashboard/projects/${projectId}/environments/${envId}/flags/${flagId}/strategies/${strat.uuid}/edit`}
                >
                  Edit
                </Button>

                <DeleteButton
                  variant="secondary"
                  to={`/dashboard/projects/${projectId}/environments/${envId}/flags/${flagId}/strategies/${strat.uuid}/delete`}
                >
                  Remove
                </DeleteButton>
              </HStack>
            </Td>
          </Tr>
        ))}
      </tbody>
    </RawTable>
  );
};

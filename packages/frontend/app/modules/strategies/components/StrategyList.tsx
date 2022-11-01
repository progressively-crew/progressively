import { AiOutlineEdit } from "react-icons/ai";
import { Button } from "~/components/Buttons/Button";
import { DeleteButton } from "~/components/Buttons/DeleteButton";
import { HStack } from "~/components/HStack";
import { RawTable, Td, Th, Tr } from "~/components/RawTable";
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
    <RawTable aria-label="Strategies applied on this flag">
      <thead>
        <Tr>
          <Th>Name</Th>
          <Th>Criteria</Th>
          <Th>Actions</Th>
        </Tr>
      </thead>
      <tbody>
        {strategies.map((strat) => (
          <Tr key={strat.uuid}>
            <Td>
              <div>{strat.name}</div>
            </Td>

            <Td>
              <StrategyCriteria strat={strat} />
            </Td>

            <Td>
              <HStack spacing={4}>
                <Button
                  variant="tertiary"
                  small
                  icon={<AiOutlineEdit />}
                  to={`/dashboard/projects/${projectId}/environments/${envId}/flags/${flagId}/strategies/${strat.uuid}/edit`}
                >
                  Edit<VisuallyHidden> {strat.name} strategy</VisuallyHidden>
                </Button>

                <DeleteButton
                  variant="tertiary"
                  small
                  to={`/dashboard/projects/${projectId}/environments/${envId}/flags/${flagId}/strategies/${strat.uuid}/delete`}
                >
                  Remove<VisuallyHidden> {strat.name} strategy</VisuallyHidden>
                </DeleteButton>
              </HStack>
            </Td>
          </Tr>
        ))}
      </tbody>
    </RawTable>
  );
};

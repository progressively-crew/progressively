import { AiOutlineEdit } from "react-icons/ai";
import { Button } from "~/components/Buttons/Button";
import { DeleteButton } from "~/components/Buttons/DeleteButton";
import { HStack } from "~/components/HStack";
import { RawTable, Td, Th, Tr } from "~/components/RawTable";
import { Eligibility } from "../types";
import { RestrictionList } from "./RestrictionList";

export interface EligibilityListProps {
  items: Array<Eligibility>;
  projectId: string;
  envId: string;
  flagId: string;
}

export const EligibilityList = ({
  items,
  projectId,
  envId,
  flagId,
}: EligibilityListProps) => {
  return (
    <RawTable aria-label="Strategies applied on this flag">
      <thead>
        <Tr>
          <Th>Criteria</Th>
          <Th>Actions</Th>
        </Tr>
      </thead>
      <tbody>
        {items.map((eligibility) => (
          <Tr key={eligibility.uuid}>
            <Td>
              <RestrictionList eligibility={eligibility} />
            </Td>

            <Td>
              <HStack spacing={4}>
                <Button
                  variant="secondary"
                  icon={<AiOutlineEdit />}
                  to={`/dashboard/projects/${projectId}/environments/${envId}/flags/${flagId}/eligibilities/${eligibility.uuid}/edit`}
                >
                  Edit
                </Button>

                <DeleteButton
                  variant="secondary"
                  to={`/dashboard/projects/${projectId}/environments/${envId}/flags/${flagId}/eligibilities/${eligibility.uuid}/delete`}
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

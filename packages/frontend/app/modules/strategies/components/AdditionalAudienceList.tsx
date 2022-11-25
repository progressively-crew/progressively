import { DeleteButton } from "~/components/Buttons/DeleteButton";
import { HStack } from "~/components/HStack";
import { RawTable, Td, Th, Tr } from "~/components/RawTable";
import { AdditionalAudienceRetrieveDTO } from "../types";
import { AudienceList } from "./AudienceList";

export interface AdditionalAudienceListProps {
  items: Array<AdditionalAudienceRetrieveDTO>;
  projectId: string;
  envId: string;
  flagId: string;
}

export const AdditionalAudienceList = ({
  items,
  projectId,
  envId,
  flagId,
}: AdditionalAudienceListProps) => {
  return (
    <RawTable aria-label="Strategies applied on this flag">
      <thead>
        <Tr>
          <Th>Criteria</Th>
          <Th>Actions</Th>
        </Tr>
      </thead>
      <tbody>
        {items.map((strat) => (
          <Tr key={strat.uuid}>
            <Td>
              <AudienceList strat={strat} />
            </Td>

            <Td>
              <div className="inline-block">
                <DeleteButton
                  variant="secondary"
                  to={`/dashboard/projects/${projectId}/environments/${envId}/flags/${flagId}/strategies/${strat.uuid}/delete`}
                >
                  Remove
                </DeleteButton>
              </div>
            </Td>
          </Tr>
        ))}
      </tbody>
    </RawTable>
  );
};

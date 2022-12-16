import { DeleteButton } from "~/components/Buttons/DeleteButton";
import { RawTable, Td, Th, Tr } from "~/components/RawTable";
import { Tag } from "~/components/Tag";
import { Typography } from "~/components/Typography";
import { Comparator } from "~/modules/misc/components/Comparator";
import { AdditionalAudienceRetrieveDTO } from "../types";

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
    <RawTable caption="Strategies applied on this flag">
      <thead>
        <Tr>
          <Th>Field</Th>
          <Th>Comparator</Th>
          <Th>Field value (one of them)</Th>
          <Th>Value to serve</Th>
          <Th>Actions</Th>
        </Tr>
      </thead>
      <tbody>
        {items.map((strat) => (
          <Tr key={strat.uuid}>
            <Td>
              <Typography>{strat.fieldName}</Typography>
            </Td>
            <Td>
              <Typography>
                <Comparator comparator={strat.fieldComparator} />
              </Typography>
            </Td>
            <Td>
              <div className="flex flex-row gap-2 flex-wrap">
                {strat.fieldValue.split("\n").map((entry, index: number) => (
                  <Tag
                    variant="PRIMARY"
                    size="S"
                    key={`${strat.uuid}-${entry}-${index}`}
                  >
                    {entry}
                  </Tag>
                ))}
              </div>
            </Td>

            <Td>
              <Tag>{strat.valueToServe}</Tag>
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

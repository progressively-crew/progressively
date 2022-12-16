import { DeleteButton } from "~/components/Buttons/DeleteButton";
import { RawTable, Td, Th, Tr } from "~/components/RawTable";
import { Tag } from "~/components/Tag";
import { Typography } from "~/components/Typography";
import { Comparator } from "~/modules/misc/components/Comparator";
import { Eligibility } from "../types";

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
    <RawTable caption="Strategies applied on this flag">
      <thead>
        <Tr>
          <Th>Field</Th>
          <Th>Comparator</Th>
          <Th>Field value (one of them)</Th>
          <Th>Actions</Th>
        </Tr>
      </thead>
      <tbody>
        {items.map((eligibility) => (
          <Tr key={eligibility.uuid}>
            <Td>
              <Typography>{eligibility.fieldName}</Typography>
            </Td>
            <Td>
              <Typography>
                <Comparator comparator={eligibility.fieldComparator} />
              </Typography>
            </Td>
            <Td>
              <div className="flex flex-row gap-2 flex-wrap">
                {eligibility.fieldValue
                  .split("\n")
                  .map((entry, index: number) => (
                    <Tag
                      variant="PRIMARY"
                      size="S"
                      key={`${eligibility.uuid}-${entry}-${index}`}
                    >
                      {entry}
                    </Tag>
                  ))}
              </div>
            </Td>

            <Td>
              <div className="inline-block">
                <DeleteButton
                  variant="secondary"
                  to={`/dashboard/projects/${projectId}/environments/${envId}/flags/${flagId}/eligibilities/${eligibility.uuid}/delete`}
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

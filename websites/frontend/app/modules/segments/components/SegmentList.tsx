import { MenuButton } from "~/components/MenuButton";
import { Segment } from "../types";
import { Table, Tbody, Th, Tr, Td } from "~/components/Table";

export interface SegmentListProps {
  segments: Array<Segment>;
  projectId: string;
  envId: string;
  flagId: string;
}
export const SegmentList = ({
  segments,
  projectId,
  envId,
  flagId,
}: SegmentListProps) => {
  return (
    <Table>
      <caption className="sr-only">Feature flag list for the project</caption>
      <thead>
        <tr>
          <Th>Segment name</Th>
          <Th>Actions</Th>
        </tr>
      </thead>
      <Tbody>
        {segments.map((segment) => (
          <Tr key={segment.uuid}>
            <Td>{segment.name}</Td>
            <Td style={{ width: 100 }}>
              <div className="flex justify-center w-full">
                <MenuButton
                  items={[
                    {
                      label: "Edit",
                      href: `/dashboard/projects/${projectId}/environments/${envId}/flags/${flagId}/segments/${segment.uuid}`,
                    },
                    {
                      label: "Remove",
                      href: `/dashboard/projects/${projectId}/environments/${envId}/flags/${flagId}/segments/${segment.uuid}/delete`,
                    },
                  ]}
                  label={"Actions on segment"}
                  variant="action"
                />
              </div>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

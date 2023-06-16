import { CardEntity } from "~/components/Entity/Entity";
import { MenuButton } from "~/components/MenuButton";
import { Segment } from "../types";

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
    <ul className="flex flex-col gap-4">
      {segments.map((segment) => (
        <li key={segment.uuid}>
          <CardEntity
            title={segment.name}
            menu={
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
            }
          />
        </li>
      ))}
    </ul>
  );
};

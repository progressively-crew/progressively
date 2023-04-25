import { AiFillCheckCircle } from "react-icons/ai";
import { TbCircle } from "react-icons/tb";
import { CardEntity } from "~/components/Entity/Entity";
import { MenuButton } from "~/components/MenuButton";
import { FlagStatus } from "~/modules/flags/components/FlagStatus";
import { FormattedDate } from "~/modules/misc/components/FormattedDate";
import { Schedule, SchedulingStatus } from "../types";

export interface SchedulingListProps {
  scheduling: Array<Schedule>;
  projectId: string;
  envId: string;
  flagId: string;
}
export const SchedulingList = ({
  scheduling,
  projectId,
  envId,
  flagId,
}: SchedulingListProps) => {
  return (
    <div className="flex flex-col gap-4">
      {scheduling.map((schedule) => {
        return (
          <div className="scheduling-row" key={schedule.uuid}>
            <CardEntity
              key={schedule.uuid}
              title={<FormattedDate utc={schedule.utc} />}
              breakAvatar
              avatar={
                schedule.schedulingStatus === SchedulingStatus.HAS_RUN ? (
                  <AiFillCheckCircle
                    aria-hidden
                    className="text-emerald-500 h-10 w-10"
                  />
                ) : (
                  <TbCircle
                    aria-hidden
                    className="text-gray-300 text-lg h-10 w-10"
                  />
                )
              }
              description={
                <p>
                  Updating status to <FlagStatus value={schedule.status} />
                </p>
              }
              menu={
                <MenuButton
                  items={[
                    {
                      label: "Remove",
                      href: `/dashboard/projects/${projectId}/environments/${envId}/flags/${flagId}/scheduling/${schedule.uuid}/delete`,
                    },
                  ]}
                  label={"Actions on scheduling"}
                  variant="action"
                />
              }
            />
          </div>
        );
      })}
    </div>
  );
};

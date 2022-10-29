import { DeleteButton } from "~/components/Buttons/DeleteButton";
import { Clock } from "~/components/Clock";
import { HStack } from "~/components/HStack";
import { RawTable } from "~/components/RawTable";
import { FlagStatus } from "~/modules/flags/components/FlagStatus";
import { FlagStatus as FlagStatusType } from "~/modules/flags/types";
import { Schedule, SchedulingStatus } from "../types";
import { ScheduleStatus } from "./ScheduleStatus";

export const formatDate = (utc: string) => {
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  };

  return new Intl.DateTimeFormat("default", options).format(new Date(utc));
};

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
    <RawTable>
      <thead>
        <tr>
          <th>Date</th>
          <th>Status of the flag</th>
          <th>Rollout percentage</th>
          <th>Has the schedule run</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {scheduling.map((schedule, index: number) => (
          <tr key={`${schedule.utc}-${schedule.rolloutPercentage}-${index}`}>
            <td>
              <HStack spacing={4}>
                <Clock
                  date={new Date(schedule.utc)}
                  ringable={
                    schedule.schedulingStatus === SchedulingStatus.NOT_RUN
                  }
                />
                <span>{formatDate(schedule.utc)}</span>
              </HStack>
            </td>
            <td>
              <div>
                <FlagStatus value={schedule.status as FlagStatusType} />
              </div>
            </td>
            <td>
              <div>{schedule.rolloutPercentage}%</div>
            </td>
            <td>
              <div>
                <ScheduleStatus value={schedule.schedulingStatus} />
              </div>
            </td>
            <td>
              <DeleteButton
                small
                variant="tertiary"
                to={`/dashboard/projects/${projectId}/environments/${envId}/flags/${flagId}/scheduling/${schedule.uuid}/delete`}
              >
                Remove
              </DeleteButton>
            </td>
          </tr>
        ))}
      </tbody>
    </RawTable>
  );
};

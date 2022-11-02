import { DeleteButton } from "~/components/Buttons/DeleteButton";
import { Clock } from "~/components/Clock";
import { HStack } from "~/components/HStack";
import { RawTable, Td, Th, Tr } from "~/components/RawTable";
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
        <Tr>
          <Th>Date</Th>
          <Th>Status of the flag</Th>
          <Th>Rollout percentage</Th>
          <Th>Has the schedule run</Th>
          <Th>Actions</Th>
        </Tr>
      </thead>
      <tbody>
        {scheduling.map((schedule, index: number) => (
          <Tr key={`${schedule.utc}-${schedule.rolloutPercentage}-${index}`}>
            <Td>
              <HStack spacing={4}>
                <Clock
                  date={new Date(schedule.utc)}
                  ringable={
                    schedule.schedulingStatus === SchedulingStatus.NOT_RUN
                  }
                />
                <span>{formatDate(schedule.utc)}</span>
              </HStack>
            </Td>
            <Td>
              <div>
                <FlagStatus value={schedule.status as FlagStatusType} />
              </div>
            </Td>
            <Td>
              <div>{schedule.rolloutPercentage}%</div>
            </Td>
            <Td>
              <div>
                <ScheduleStatus value={schedule.schedulingStatus} />
              </div>
            </Td>
            <Td>
              <DeleteButton
                variant="secondary"
                to={`/dashboard/projects/${projectId}/environments/${envId}/flags/${flagId}/scheduling/${schedule.uuid}/delete`}
              >
                Remove
              </DeleteButton>
            </Td>
          </Tr>
        ))}
      </tbody>
    </RawTable>
  );
};

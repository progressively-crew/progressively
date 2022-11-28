import { DeleteButton } from "~/components/Buttons/DeleteButton";
import { SliderInput } from "~/components/Fields/SliderInput";
import { RawTable, Td, Th, Tr } from "~/components/RawTable";
import { Typography } from "~/components/Typography";
import { FlagStatus } from "~/modules/flags/components/FlagStatus";
import { FlagStatus as FlagStatusType } from "~/modules/flags/types";
import { Schedule } from "../types";
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
          <Th>Flag status</Th>
          <Th>Percentage</Th>
          <Th>Has run</Th>
          <Th>Actions</Th>
        </Tr>
      </thead>
      <tbody>
        {scheduling.map((schedule, index: number) => (
          <Tr key={`${schedule.utc}-${schedule.rolloutPercentage}-${index}`}>
            <Td>
              <Typography className="text-sm">
                {formatDate(schedule.utc)}
              </Typography>
            </Td>
            <Td>
              <FlagStatus value={schedule.status as FlagStatusType} />
            </Td>
            <Td>
              <SliderInput
                onChange={() => {}}
                percentageValue={schedule.rolloutPercentage}
                label={""}
                hiddenLabel
                name={"not-important"}
              />
            </Td>
            <Td>
              <ScheduleStatus value={schedule.schedulingStatus} />
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

import { useEffect, useState } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { DeleteButton } from "~/components/Buttons/DeleteButton";
import { Checkbox } from "~/components/Checkbox";
import { SliderInput } from "~/components/Fields/SliderInput";
import { RawTable, Td, Th, Tr } from "~/components/RawTable";
import { Switch } from "~/components/Switch";
import { Typography } from "~/components/Typography";
import { FlagStatus as FlagStatusType } from "~/modules/flags/types";
import { Schedule, SchedulingStatus } from "../types";

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

const DateCell = ({ utc }: { utc: string }) => {
  const [formatted, setFormatted] = useState<string>();

  useEffect(() => {
    setFormatted(formatDate(utc));
  }, []);

  if (!formatted) return null;

  return <Typography className="text-sm">{formatted}</Typography>;
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
            <Td width="20%">
              <DateCell utc={schedule.utc} />
            </Td>
            <Td>
              <Switch
                label="Next flag status"
                type="submit"
                checked={schedule.status === FlagStatusType.ACTIVATED}
              />
            </Td>
            <Td>
              <SliderInput
                onChange={() => {}}
                percentageValue={schedule.rolloutPercentage}
                label={""}
                hiddenLabel
                name={"not-important-" + index}
              />
            </Td>
            <Td className="text-center py-4 px-8 flex justify-center">
              {schedule.schedulingStatus !== SchedulingStatus.HAS_RUN && (
                <AiFillCheckCircle
                  aria-label="The scheduled update has already run"
                  className="text-2xl text-indigo-500"
                />
              )}
            </Td>
            <Td>
              <div className="inline-block">
                <DeleteButton
                  variant="secondary"
                  to={`/dashboard/projects/${projectId}/environments/${envId}/flags/${flagId}/scheduling/${schedule.uuid}/delete`}
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

import { useEffect, useState } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { TbCircle } from "react-icons/tb";
import { DeleteButton } from "~/components/Buttons/DeleteButton";
import { Card } from "~/components/Card";
import { SliderInput } from "~/components/Fields/SliderInput";
import { RawTable, Td, Th, Tr } from "~/components/RawTable";
import { Switch } from "~/components/Switch";
import { Typography } from "~/components/Typography";
import { FlagStatus } from "~/modules/flags/components/FlagStatus";
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

  return <p className="font-bold dark:text-slate-50">{formatted}</p>;
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
    <div>
      <Card>
        {scheduling.map((schedule, index: number) => {
          return (
            <div
              className="px-6 py-4 grid grid-cols-3"
              key={`${schedule.utc}-${schedule.data?.rolloutPercentage}-${index}`}
            >
              <div className="flex flex-row gap-2">
                {schedule.schedulingStatus === SchedulingStatus.HAS_RUN ? (
                  <>
                    <AiFillCheckCircle
                      aria-hidden
                      className="text-emerald-500 mt-1"
                    />
                    <div>
                      <DateCell utc={schedule.utc} />
                      <Typography className="text-sm">
                        The schedule has already run
                      </Typography>
                    </div>
                  </>
                ) : (
                  <>
                    <TbCircle aria-hidden className="text-gray-300 mt-1" />
                    <div>
                      <DateCell utc={schedule.utc} />
                      <Typography className="text-sm">
                        The schedule has not run yet
                      </Typography>
                    </div>
                  </>
                )}
              </div>

              <div>
                <Typography className="text-sm">
                  Updating status to <FlagStatus value={schedule.status} />
                </Typography>
                <Typography className="text-sm">
                  Updating rollout percentage to:{" "}
                  <strong className="text-black dark:text-slate-50">
                    {schedule.data.rolloutPercentage}%
                  </strong>
                </Typography>
              </div>
            </div>
          );
        })}
      </Card>

      <RawTable caption="Scheduling list">
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
            <Tr
              key={`${schedule.utc}-${schedule.data?.rolloutPercentage}-${index}`}
            >
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
                  percentageValue={schedule.data?.rolloutPercentage || 0}
                  label={""}
                  hiddenLabel
                  name={"not-important-" + index}
                />
              </Td>
              <Td className="text-center py-4 px-8 flex justify-center">
                {schedule.schedulingStatus === SchedulingStatus.HAS_RUN && (
                  <AiFillCheckCircle
                    aria-label="The scheduled update has already run"
                    className="text-2xl text-indigo-500 dark:text-indigo-20"
                  />
                )}
              </Td>
              <Td>
                <div className="inline-block">
                  <DeleteButton
                    size="S"
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
    </div>
  );
};

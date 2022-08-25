import { RawTable } from "~/components/RawTable";
import { Tag } from "~/components/Tag";
import { FlagStatus } from "~/modules/flags/components/FlagStatus";
import { FlagStatus as FlagStatusType } from "~/modules/flags/types";
import { Schedule } from "../types";

export const formatDate = (timestamp: number) => {
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  };

  return new Intl.DateTimeFormat("default", options).format(
    new Date(timestamp)
  );
};

export interface SchedulingListProps {
  scheduling: Array<Schedule>;
}
export const SchedulingList = ({ scheduling }: SchedulingListProps) => {
  return (
    <RawTable>
      <thead>
        <tr>
          <th>Date</th>
          <th>Status at that date</th>
          <th>Rollout percentage at that date</th>
        </tr>
      </thead>
      <tbody>
        {scheduling.map((schedule, index: number) => (
          <tr
            key={`${schedule.timestamp}-${schedule.rolloutPercentage}-${index}`}
          >
            <td>{formatDate(schedule.timestamp)}</td>
            <td>
              <FlagStatus value={schedule.status as FlagStatusType} />
            </td>
            <td>
              <Tag>{schedule.rolloutPercentage}%</Tag>
            </td>
          </tr>
        ))}
      </tbody>
    </RawTable>
  );
};

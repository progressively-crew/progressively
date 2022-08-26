import { Tag } from "~/components/Tag";
import { SchedulingStatus } from "../types";

export interface ScheduleStatusProps {
  value: SchedulingStatus;
}

export const ScheduleStatus = ({ value }: ScheduleStatusProps) => {
  if (value === SchedulingStatus.HAS_RUN) {
    return (
      <Tag background="nemesis" color="nemesisLight">
        Already run
      </Tag>
    );
  }

  if (value === SchedulingStatus.NOT_RUN) {
    return (
      <Tag color="nemesis" background="nemesisLight">
        Not run yet
      </Tag>
    );
  }

  return null;
};

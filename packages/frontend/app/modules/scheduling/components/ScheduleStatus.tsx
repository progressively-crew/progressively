import { Tag } from "~/components/Tag";
import { SchedulingStatus } from "../types";

export interface ScheduleStatusProps {
  value: SchedulingStatus;
}

export const ScheduleStatus = ({ value }: ScheduleStatusProps) => {
  if (value === SchedulingStatus.HAS_RUN) {
    return <Tag>Already run</Tag>;
  }

  if (value === SchedulingStatus.NOT_RUN) {
    return <Tag>Not run yet</Tag>;
  }

  return null;
};

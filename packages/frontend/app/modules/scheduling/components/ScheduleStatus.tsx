import { Tag } from "~/components/Tag";
import { SchedulingStatus } from "../types";

export interface ScheduleStatusProps {
  value: SchedulingStatus;
}

export const ScheduleStatus = ({ value }: ScheduleStatusProps) => {
  if (value === SchedulingStatus.HAS_RUN) {
    return <Tag className="bg-indigo-100 text-indigo-700">Already run</Tag>;
  }

  if (value === SchedulingStatus.NOT_RUN) {
    return <Tag className="bg-red-100 text-red-700">Not run yet</Tag>;
  }

  return null;
};

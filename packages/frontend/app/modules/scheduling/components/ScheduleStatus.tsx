import { Checkbox } from "~/components/Checkbox";
import { Tag } from "~/components/Tag";
import { VisuallyHidden } from "~/components/VisuallyHidden";
import { SchedulingStatus } from "../types";

export interface ScheduleStatusProps {
  value: SchedulingStatus;
}

export const ScheduleStatus = ({ value }: ScheduleStatusProps) => {
  return (
    <div>
      <div aria-hidden>
        <Checkbox
          name="not-important"
          value=""
          checked={value === SchedulingStatus.HAS_RUN}
        />
      </div>

      <VisuallyHidden>
        {value === SchedulingStatus.HAS_RUN ? "Yes" : "No"}
      </VisuallyHidden>
    </div>
  );
};

import { useState } from "react";
import { DateTimeInput } from "~/components/Fields/DateTimeInput";
import { FormGroup } from "~/components/Fields/FormGroup";
import { Switch } from "~/components/Switch/Switch";
import { FlagStatus } from "~/modules/flags/types";

export const CreateSchedulingFrom = () => {
  const [nextStatus, setNextStatus] = useState(FlagStatus.NOT_ACTIVATED);

  return (
    <FormGroup>
      <DateTimeInput
        label="When should the flag change status"
        name="dateTime"
      />

      <div>
        <Switch
          type="button"
          label="What should be the next status"
          checked={FlagStatus.ACTIVATED === nextStatus}
          onClick={() =>
            setNextStatus((p) =>
              p === FlagStatus.ACTIVATED
                ? FlagStatus.NOT_ACTIVATED
                : FlagStatus.ACTIVATED
            )
          }
        />
      </div>

      <input type="hidden" name={"nextStatus"} value={nextStatus} />
    </FormGroup>
  );
};

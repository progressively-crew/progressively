import { useState } from "react";
import { DateTimeInput } from "~/components/Fields/DateTimeInput";
import { FormGroup } from "~/components/Fields/FormGroup";
import { Label } from "~/components/Fields/Label";
import { SelectField } from "~/components/Fields/SelectField";
import { SliderInput } from "~/components/Fields/SliderInput";
import { Spacer } from "~/components/Spacer";
import { Switch } from "~/components/Switch";
import { useFlagEnv } from "~/modules/flags/contexts/useFlagEnv";
import { FlagStatus } from "~/modules/flags/types";
import { SchedulingAction } from "./types";

export const CreateSchedulingFrom = () => {
  const { flagEnv } = useFlagEnv();
  const [actionSelected, setActionSelected] = useState(
    flagEnv.variants.length > 0
      ? SchedulingAction.UpdateVariant
      : SchedulingAction.UpdateRolloutPercentage
  );

  const [percentage, setPercentage] = useState(100);
  const [nextStatus, setNextStatus] = useState(FlagStatus.NOT_ACTIVATED);

  return (
    <FormGroup>
      <DateTimeInput
        label="When should the flag change status"
        name="dateTime"
      />

      <div>
        <Label as="span" id="next-schedule">
          What should be the next status
        </Label>
        <Spacer size={1} />

        <Switch
          aria-labelledby="next-schedule"
          type="button"
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

      <SelectField
        name="action-select"
        label="Action to perform"
        defaultValue={actionSelected}
        onValueChange={(nextValue) =>
          setActionSelected(nextValue as SchedulingAction)
        }
        options={[
          {
            value: SchedulingAction.UpdateRolloutPercentage,
            label: "Update the global rollout percentage",
          },
          {
            value: SchedulingAction.UpdateVariant,
            label: "Update a variant percentage",
          },
        ]}
      />

      {actionSelected === SchedulingAction.UpdateRolloutPercentage ? (
        <SliderInput
          onChange={setPercentage}
          percentageValue={percentage}
          label={"What should be the next rollout percentage"}
          name={"rolloutPercentage"}
        />
      ) : null}
    </FormGroup>
  );
};

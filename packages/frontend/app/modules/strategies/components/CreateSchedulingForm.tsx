import { useTransition } from "@remix-run/react";
import { useState } from "react";
import { SubmitButton } from "~/components/Buttons/SubmitButton";
import { DateTimeInput } from "~/components/Fields/DateTimeInput";
import { FormGroup } from "~/components/Fields/FormGroup";
import { Label } from "~/components/Fields/Label";
import { SliderInput } from "~/components/Fields/SliderInput";
import { Spacer } from "~/components/Spacer";
import { Switch } from "~/components/Switch";
import { FlagStatus } from "~/modules/flags/types";

export const CreateSchedulingFrom = () => {
  const [percentage, setPercentage] = useState(100);
  const [nextStatus, setNextStatus] = useState(FlagStatus.NOT_ACTIVATED);

  const transition = useTransition();
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

      <SliderInput
        onChange={setPercentage}
        percentageValue={percentage}
        label={"What should be the next rollout percentage"}
        name={"rolloutPercentage"}
      />

      <div>
        <SubmitButton
          isLoading={transition.state === "submitting"}
          loadingText="Saving the scheduling, please wait..."
        >
          Save the schedule
        </SubmitButton>
      </div>
    </FormGroup>
  );
};

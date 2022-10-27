import { useTransition } from "@remix-run/react";
import { useState } from "react";
import { SubmitButton } from "~/components/Buttons/SubmitButton";
import { DateTimeInput } from "~/components/Fields/DateTimeInput";
import { FormGroup } from "~/components/Fields/FormGroup";
import { RadioField } from "~/components/Fields/RadioField";
import { SliderInput } from "~/components/Fields/SliderInput";
import { FlagStatus } from "~/modules/flags/types";

export const CreateSchedulingFrom = () => {
  const [percentage, setPercentage] = useState(100);
  const [status, setStatus] = useState<FlagStatus>(FlagStatus.ACTIVATED);

  const transition = useTransition();
  return (
    <FormGroup>
      <DateTimeInput
        label="When should the flag change status"
        name="dateTime"
      />

      <RadioField
        title="What should be the next status"
        options={[
          { value: FlagStatus.ACTIVATED, label: "Activated" },
          { value: FlagStatus.NOT_ACTIVATED, label: "Not activated" },
        ]}
        name={"nextStatus"}
        value={status}
        onChange={setStatus}
      />

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

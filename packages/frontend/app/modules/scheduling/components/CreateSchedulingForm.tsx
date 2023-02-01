import { useState } from "react";
import { DateTimeInput } from "~/components/Fields/DateTimeInput";
import { FormGroup } from "~/components/Fields/FormGroup";
import { SliderInput } from "~/components/Fields/SliderInput";
import { Switch } from "~/components/Switch/Switch";

import { FlagEnv, FlagStatus } from "~/modules/flags/types";
import { SchedulingType } from "~/modules/scheduling/types";
import { MultiVariantFields } from "./MultiVariantFields";

export interface CreateSchedulingFormProps {
  flagEnv: FlagEnv;
}

const SingleVariantFields = () => {
  const [percentage, setPercentage] = useState(100);

  return (
    <>
      <SliderInput
        onChange={setPercentage}
        percentageValue={percentage}
        label={"What should be the next rollout percentage"}
        name={"rolloutPercentage"}
      />

      <input
        type="hidden"
        name="type"
        value={SchedulingType.UpdatePercentage}
      />
    </>
  );
};

export const CreateSchedulingFrom = ({
  flagEnv,
}: CreateSchedulingFormProps) => {
  const [nextStatus, setNextStatus] = useState(FlagStatus.NOT_ACTIVATED);
  const isMultiVariate = flagEnv.variants.length > 0;

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

      {isMultiVariate ? (
        <MultiVariantFields variants={flagEnv.variants} />
      ) : (
        <SingleVariantFields />
      )}
    </FormGroup>
  );
};

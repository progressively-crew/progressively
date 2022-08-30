import { Form } from "@remix-run/react";
import { useState } from "react";
import { SubmitButton } from "~/components/Buttons/SubmitButton";
import { SliderInput } from "~/components/Fields/SliderInput";

import { Stack } from "~/components/Stack";

export interface SliderFlagProps {
  initialRolloutPercentage: number;
  labelledBy?: string;
}

export const SliderFlag = ({
  labelledBy,
  initialRolloutPercentage,
}: SliderFlagProps) => {
  const [rolloutPercentage, setRolloutPercentage] = useState(
    initialRolloutPercentage
  );

  return (
    <Form method="post">
      <Stack spacing={4}>
        <SliderInput
          labelledBy={labelledBy}
          percentageValue={rolloutPercentage}
          name={"rolloutPercentage"}
          label={"Percentage of the audience"}
          onChange={setRolloutPercentage}
        />

        <div>
          <SubmitButton>Adjust</SubmitButton>
        </div>
      </Stack>
      <input type="hidden" name="_type" value="percentage" />
    </Form>
  );
};

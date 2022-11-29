import { Form } from "@remix-run/react";
import { useEffect, useState } from "react";
import { SubmitButton } from "~/components/Buttons/SubmitButton";
import { SliderInput } from "~/components/Fields/SliderInput";

import { Stack } from "~/components/Stack";

export interface SliderFlagProps {
  initialRolloutPercentage: number;
}

export const SliderFlag = ({ initialRolloutPercentage }: SliderFlagProps) => {
  const [rolloutPercentage, setRolloutPercentage] = useState(
    initialRolloutPercentage
  );

  useEffect(() => {
    setRolloutPercentage(initialRolloutPercentage);
  }, [initialRolloutPercentage]);

  console.log("llool");
  return (
    <Form method="post">
      <Stack spacing={4}>
        <SliderInput
          percentageValue={rolloutPercentage}
          name={"rolloutPercentage"}
          label={"Percentage of the audience"}
          hiddenLabel
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

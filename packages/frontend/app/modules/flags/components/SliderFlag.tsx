import { Form } from "@remix-run/react";
import { useEffect, useState } from "react";
import { SubmitButton } from "~/components/Buttons/SubmitButton";
import { SliderInput } from "~/components/Fields/SliderInput";

import { Stack } from "~/components/Stack";

export interface SliderFlagProps {
  initialRolloutPercentage: number;
  formId: string;
}

export const SliderFlag = ({
  initialRolloutPercentage,
  formId,
}: SliderFlagProps) => {
  const [rolloutPercentage, setRolloutPercentage] = useState(
    initialRolloutPercentage
  );

  useEffect(() => {
    setRolloutPercentage(initialRolloutPercentage);
  }, [initialRolloutPercentage]);

  return (
    <Form method="post" id={formId}>
      <SliderInput
        percentageValue={rolloutPercentage}
        name={"rolloutPercentage"}
        label={"Percentage of the audience"}
        hiddenLabel
        onChange={setRolloutPercentage}
      />

      <input type="hidden" name="_type" value="percentage" />
    </Form>
  );
};

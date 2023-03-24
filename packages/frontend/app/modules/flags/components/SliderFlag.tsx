import { Form } from "@remix-run/react";
import { useEffect, useState } from "react";
import { SliderInput } from "~/components/Fields/SliderInput";

export interface SliderFlagProps {
  initialRolloutPercentage: number;
  formId: string;
  bgColor?: string;
  fgColor?: string;
}

export const SliderFlag = ({
  initialRolloutPercentage,
  formId,
  bgColor,
  fgColor,
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
        bgColor={bgColor}
        fgColor={fgColor}
      />

      <input type="hidden" name="_type" value="percentage" />
    </Form>
  );
};

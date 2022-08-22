import { ActionFunction } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { useState } from "react";
import { SubmitButton } from "~/components/Buttons/SubmitButton";
import { GradientBorderedCard, CardContent } from "~/components/Card";
import { SliderInput } from "~/components/Fields/SliderInput";
import { Stack } from "~/components/Stack";

export interface SliderFlagProps {
  isFlagActivated: boolean;
  initialRolloutPercentage: number;
}

export const SliderFlag = ({
  isFlagActivated,
  initialRolloutPercentage,
}: SliderFlagProps) => {
  const [rolloutPercentage, setRolloutPercentage] = useState(
    initialRolloutPercentage
  );

  return (
    <Form method="post">
      <GradientBorderedCard isFlagActivated={isFlagActivated}>
        <CardContent padding={8}>
          <Stack spacing={4}>
            <SliderInput
              percentageValue={rolloutPercentage}
              name={"rolloutPercentage"}
              label={"Percentage of the audience"}
              onChange={setRolloutPercentage}
            />

            <div>
              <SubmitButton variant="secondary">Adjust</SubmitButton>
            </div>
          </Stack>
        </CardContent>
      </GradientBorderedCard>
      <input type="hidden" name="_type" value="percentage" />
    </Form>
  );
};

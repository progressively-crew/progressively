import { Form } from "@remix-run/react";
import { useState } from "react";
import { SuccessBox } from "~/components/Boxes/SuccessBox";
import { SubmitButton } from "~/components/Buttons/SubmitButton";
import { GradientBorderedCard, CardContent } from "~/components/Card";
import { SliderInput } from "~/components/Fields/SliderInput";
import { Spacer } from "~/components/Spacer";
import { Stack } from "~/components/Stack";

export interface SliderFlagProps {
  isFlagActivated: boolean;
  initialRolloutPercentage: number;
  isSuccessful: boolean;
}

export const SliderFlag = ({
  isFlagActivated,
  initialRolloutPercentage,
  isSuccessful,
}: SliderFlagProps) => {
  const [rolloutPercentage, setRolloutPercentage] = useState(
    initialRolloutPercentage
  );

  return (
    <GradientBorderedCard isFlagActivated={isFlagActivated}>
      <CardContent padding={6}>
        {isSuccessful && (
          <>
            <SuccessBox id="percentage-changed">
              Percentage adjusted.
            </SuccessBox>
            <Spacer size={4} />
          </>
        )}
        <Form method="post">
          <Stack spacing={4}>
            <SliderInput
              percentageValue={rolloutPercentage}
              name={"rolloutPercentage"}
              label={"Percentage of the audience"}
              onChange={setRolloutPercentage}
            />

            <div>
              <SubmitButton variant="secondary" small>
                Adjust
              </SubmitButton>
            </div>
          </Stack>
          <input type="hidden" name="_type" value="percentage" />
        </Form>
      </CardContent>
    </GradientBorderedCard>
  );
};

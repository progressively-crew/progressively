import { Radio, RadioGroup } from "@chakra-ui/react";
import { useState } from "react";
import { SliderInput } from "~/components/Fields/SliderInput";
import { Section, SectionHeader } from "~/components/Section";
import { ActivationType } from "../types/activation";

export interface ActivationStrategyProps {
  activationStrategy: ActivationType;
  errors: Record<string, string>;
  onActivationChange: (nextActionvation: ActivationType) => void;
}

export const ActivationStrategy = ({
  activationStrategy,
  onActivationChange,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  errors,
}: ActivationStrategyProps) => {
  const [percentageValue, setPercentageValue] = useState<number>(50);

  return (
    <Section id="activation-strategy">
      <SectionHeader title="Activation strategy" />

      <RadioGroup value={activationStrategy} onChange={onActivationChange}>
        <Radio
          id="boolean"
          name="strategy-activation"
          value="boolean"
          size="lg"
          h={12}
        >
          Everyone will see the variants
        </Radio>

        <Radio
          id="percentage"
          name="strategy-activation"
          value="percentage"
          size="lg"
          h={12}
        >
          A percentage of the audience
        </Radio>
      </RadioGroup>

      {activationStrategy === "percentage" && (
        <SliderInput
          name="percentage-value"
          label={`Percentage of the people concerned (${percentageValue}
            %):`}
          onChange={setPercentageValue}
          percentageValue={percentageValue}
        />
      )}
    </Section>
  );
};

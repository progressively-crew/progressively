import { useState } from "react";
import { RadioField } from "~/components/Fields/RadioField";
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

      <RadioField<ActivationType>
        value={activationStrategy}
        onChange={onActivationChange}
        name="strategy-activation"
        options={[
          { value: "boolean", label: "Everyone will see the variants" },
          { value: "percentage", label: "A percentage of the audience" },
        ]}
      />

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

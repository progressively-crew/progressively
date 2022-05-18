import { Box, Radio, RadioGroup } from "@chakra-ui/react";
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
        <Box>
          <Radio
            id="boolean"
            name="strategy-activation"
            value="boolean"
            size="lg"
            h={12}
          >
            Everyone will see the variants
          </Radio>
        </Box>

        <Box>
          <Radio
            id="percentage"
            name="strategy-activation"
            value="percentage"
            size="lg"
            h={12}
          >
            A percentage of the audience
          </Radio>
        </Box>
      </RadioGroup>

      {activationStrategy === "percentage" && (
        <Box
          borderColor="background100"
          borderWidth={1}
          p={[4, 4, 8]}
          borderRadius={6}
        >
          <SliderInput
            name="percentage-value"
            label={`Percentage of the people concerned (${percentageValue}
            %):`}
            onChange={setPercentageValue}
            percentageValue={percentageValue}
          />
        </Box>
      )}
    </Section>
  );
};

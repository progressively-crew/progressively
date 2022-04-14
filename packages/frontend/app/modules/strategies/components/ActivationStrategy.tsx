import {
  Box,
  FormControl,
  Radio,
  RadioGroup,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/react";
import { useState } from "react";
import { FormLabel } from "~/components/FormLabel";
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

      <RadioGroup
        value={activationStrategy}
        onChange={onActivationChange}
        px={4}
        pb={4}
      >
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
            A percentage of the people will see the variants
          </Radio>
        </Box>
      </RadioGroup>

      {activationStrategy === "percentage" && (
        <Box
          ml={[4, 4, 12]}
          mr={[4, 4, 12]}
          borderColor="background100"
          borderWidth={1}
          p={[4, 4, 8]}
          borderRadius={6}
        >
          <FormControl>
            <FormLabel id="percentage-value">
              Percentage of the people concerned ({percentageValue}
              %):
            </FormLabel>

            <Slider
              name="percentage-value"
              id="percentage-value"
              aria-labelledby="percentage-value"
              min={0}
              max={100}
              step={1}
              value={percentageValue}
              onChange={setPercentageValue}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </FormControl>
        </Box>
      )}
    </Section>
  );
};

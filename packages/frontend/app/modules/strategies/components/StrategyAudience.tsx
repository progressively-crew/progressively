import { Box, RadioGroup, Radio, Stack } from "@chakra-ui/react";
import { SelectField } from "~/components/Fields/SelectField";
import { TextareaInput } from "~/components/Fields/TextareaInput";
import { TextInput } from "~/components/Fields/TextInput";
import { Section, SectionHeader } from "~/components/Section";
import { ComparatorEnum, StrategyCreateDTO } from "../types";
import { StrategyRuleType } from "../types/StrategyRule";

export interface StrategyAudienceProps {
  strategyType: StrategyRuleType;
  onStrategyChange: (nextStrategy: StrategyRuleType) => void;
  errors: Record<string, string>;
  initialFieldName?: StrategyCreateDTO["fieldName"];
  initialFieldValue?: StrategyCreateDTO["fieldValue"];
  initialFieldComparator?: StrategyCreateDTO["fieldComparator"];
}

export const StrategyAudience = ({
  strategyType,
  onStrategyChange,
  errors,
  initialFieldName,
  initialFieldValue,
  initialFieldComparator,
}: StrategyAudienceProps) => {
  return (
    <Section id="strategy-audience">
      <SectionHeader title="Strategy audience" />

      <RadioGroup value={strategyType} onChange={onStrategyChange}>
        <Box>
          <Radio
            id="everybody"
            name="strategy-type"
            value="default"
            size="lg"
            h={12}
          >
            Everybody is concerned
          </Radio>
        </Box>

        <Box>
          <Radio
            id="field-name-radio"
            name="strategy-type"
            value="field"
            size="lg"
            h={12}
          >
            People with a specific field
          </Radio>
        </Box>

        {/* <Box>
          <Radio name="strategy-type" value="pool" size="lg" h={12}>
            People belonging to a given group
          </Radio>
        </Box> */}
      </RadioGroup>

      {strategyType === "field" && (
        <Stack
          borderColor="background100"
          borderWidth={1}
          p={[4, 4, 8]}
          borderRadius={6}
          spacing={6}
        >
          <TextInput
            isInvalid={Boolean(errors["field-name"])}
            label="Field name:"
            placeholder="e.g: email"
            defaultValue={initialFieldName}
            name="field-name"
          />

          <SelectField
            isInvalid={Boolean(errors["field-comparator"])}
            name="field-comparator"
            label="Field comparator:"
            defaultValue={initialFieldComparator}
            options={[
              { value: ComparatorEnum.Equals, label: "Equals" },
              { value: ComparatorEnum.NotEquals, label: "Not equals" },
              { value: ComparatorEnum.Contains, label: "Contains" },
            ]}
          />

          <TextareaInput
            isInvalid={Boolean(errors["field-value"])}
            label="Values matching the previous field (one per line):"
            name="field-value"
            defaultValue={initialFieldValue}
            placeholder="e.g: marvin.frachet@something.com"
          />
        </Stack>
      )}
    </Section>
  );
};

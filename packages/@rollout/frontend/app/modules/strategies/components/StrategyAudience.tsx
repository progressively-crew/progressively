import {
  Box,
  RadioGroup,
  Radio,
  FormControl,
  Input,
  Select,
  Textarea,
  Stack,
} from "@chakra-ui/react";
import { FormLabel } from "~/components/FormLabel";
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

      <RadioGroup
        value={strategyType}
        onChange={onStrategyChange}
        px={4}
        pb={4}
      >
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
          ml={[4, 4, 12]}
          mr={[4, 4, 12]}
          borderColor="background100"
          borderWidth={1}
          p={[4, 4, 8]}
          borderRadius={6}
          spacing={6}
        >
          <FormControl isInvalid={Boolean(errors["field-name"])}>
            <FormLabel htmlFor="field-name">Field name:</FormLabel>
            <Input
              type="text"
              name="field-name"
              id="field-name"
              placeholder="e.g: email"
              defaultValue={initialFieldName}
              aria-describedby={
                errors["field-name"] ? "error-field-name" : undefined
              }
            />
          </FormControl>

          <FormControl isInvalid={Boolean(errors["field-comparator"])}>
            <FormLabel htmlFor="field-comparator">Field comparator:</FormLabel>

            <Select
              name="field-comparator"
              id="field-comparator"
              defaultValue={initialFieldComparator}
              aria-describedby={
                errors["field-comparator"]
                  ? "error-field-comparator"
                  : undefined
              }
            >
              <option value={ComparatorEnum.Equals}>Equals</option>
              <option value={ComparatorEnum.NotEquals}>Not equals</option>
              <option value={ComparatorEnum.Contains}>Contains</option>
            </Select>
          </FormControl>

          <FormControl isInvalid={Boolean(errors["field-value"])}>
            <FormLabel htmlFor="field-value">
              Values matching the previous field (one per line):
            </FormLabel>
            <Textarea
              name="field-value"
              id="field-value"
              defaultValue={initialFieldValue}
              placeholder="e.g: marvin.frachet@gmail.com"
              aria-describedby={
                errors["field-value"] ? "error-field-value" : undefined
              }
            />
          </FormControl>
        </Stack>
      )}
    </Section>
  );
};

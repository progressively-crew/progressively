import { FormGroup } from "~/components/Fields/FormGroup";
import { RadioField } from "~/components/Fields/RadioField";
import { SelectField } from "~/components/Fields/SelectField";
import { TextareaInput } from "~/components/Fields/TextareaInput";
import { TextInput } from "~/components/Fields/TextInput";
import { HStack } from "~/components/HStack";
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
    <FormGroup>
      <RadioField<StrategyRuleType>
        title="Who's concerned?"
        value={strategyType}
        onChange={onStrategyChange}
        name="strategy-type"
        options={[
          { value: "default", label: "Everybody is concerned" },
          { value: "field", label: "People with a specific field" },
        ]}
      />

      {strategyType === "field" && (
        <FormGroup>
          <HStack spacing={4}>
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
                { value: ComparatorEnum.Contains, label: "Contains" },
              ]}
            />
          </HStack>

          <TextareaInput
            isInvalid={Boolean(errors["field-value"])}
            label="Values matching the previous field (one per line):"
            name="field-value"
            defaultValue={initialFieldValue}
            placeholder="e.g: marvin.frachet@something.com"
          />
        </FormGroup>
      )}
    </FormGroup>
  );
};

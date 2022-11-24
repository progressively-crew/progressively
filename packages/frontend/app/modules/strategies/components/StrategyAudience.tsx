import { FormGroup } from "~/components/Fields/FormGroup";
import { SelectField } from "~/components/Fields/SelectField";
import { TextareaInput } from "~/components/Fields/TextareaInput";
import { TextInput } from "~/components/Fields/TextInput";
import { HStack } from "~/components/HStack";
import { ComparatorEnum, AdditionalAudienceCreateDTO } from "../types";

export interface StrategyAudienceProps {
  errors: Record<string, string>;
  initialFieldName?: AdditionalAudienceCreateDTO["fieldName"];
  initialFieldValue?: AdditionalAudienceCreateDTO["fieldValue"];
  initialFieldComparator?: AdditionalAudienceCreateDTO["fieldComparator"];
}

export const StrategyAudience = ({
  errors,
  initialFieldName,
  initialFieldValue,
  initialFieldComparator,
}: StrategyAudienceProps) => {
  return (
    <FormGroup>
      <FormGroup>
        <HStack spacing={4}>
          <TextInput
            isInvalid={Boolean(errors["field-name"])}
            label="Field name"
            placeholder="e.g: email"
            defaultValue={initialFieldName}
            name="field-name"
          />

          <SelectField
            isInvalid={Boolean(errors["field-comparator"])}
            name="field-comparator"
            label="Field comparator"
            defaultValue={initialFieldComparator}
            options={[
              { value: ComparatorEnum.Equals, label: "Equals" },
              { value: ComparatorEnum.Contains, label: "Contains" },
            ]}
          />
        </HStack>

        <TextareaInput
          isInvalid={Boolean(errors["field-value"])}
          label="Values matching the previous field (one per line)"
          name="field-value"
          defaultValue={initialFieldValue}
          placeholder="e.g: marvin.frachet@something.com"
        />
      </FormGroup>
    </FormGroup>
  );
};

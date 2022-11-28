import { useState } from "react";
import { FormGroup } from "~/components/Fields/FormGroup";
import { RadioField } from "~/components/Fields/RadioField";
import { SelectField } from "~/components/Fields/SelectField";
import { TextareaInput } from "~/components/Fields/TextareaInput";
import { TextInput } from "~/components/Fields/TextInput";
import { HStack } from "~/components/HStack";
import { Variant } from "~/modules/variants/types";
import {
  ComparatorEnum,
  AdditionalAudienceCreateDTO,
  StrategyValueToServe,
} from "../types";

export interface AudienceFieldsProps {
  errors: Record<string, string>;
  initialFieldName?: AdditionalAudienceCreateDTO["fieldName"];
  initialFieldValue?: AdditionalAudienceCreateDTO["fieldValue"];
  initialFieldComparator?: AdditionalAudienceCreateDTO["fieldComparator"];
  variants: Array<Variant>;
}

export const AudienceFields = ({
  errors,
  initialFieldName,
  initialFieldValue,
  initialFieldComparator,
  variants,
}: AudienceFieldsProps) => {
  const [status, setStatus] = useState(StrategyValueToServe.Boolean);

  const valueOptions = [
    { value: StrategyValueToServe.Boolean, label: "A boolean" },
    { value: StrategyValueToServe.String, label: "A string" },
  ];

  if (variants.length > 0) {
    valueOptions.push({
      value: StrategyValueToServe.Variant,
      label: "A variant value",
    });
  }

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

        <RadioField
          title="What value to you want to serve?"
          options={valueOptions}
          name={"value-to-serve-type"}
          value={status}
          onChange={setStatus}
        />

        {status === StrategyValueToServe.Variant && (
          <SelectField
            isInvalid={Boolean(errors["value-to-serve"])}
            name="value-to-serve"
            label="Variant value to serve"
            defaultValue={variants[0].value}
            options={variants.map((v) => ({ label: v.value, value: v.value }))}
          />
        )}

        {status === StrategyValueToServe.Boolean && (
          <SelectField
            isInvalid={Boolean(errors["value-to-serve"])}
            name="value-to-serve"
            label="Value to serve"
            defaultValue={initialFieldComparator}
            options={[
              { value: "true", label: "True" },
              { value: "false", label: "False" },
            ]}
          />
        )}

        {status === StrategyValueToServe.String && (
          <TextInput
            isInvalid={Boolean(errors["value-to-serve"])}
            label="Value to serve"
            placeholder="e.g: A"
            name="value-to-serve"
          />
        )}
      </FormGroup>
    </FormGroup>
  );
};

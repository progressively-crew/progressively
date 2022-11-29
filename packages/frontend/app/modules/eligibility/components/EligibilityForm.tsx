import { FaEquals } from "react-icons/fa";
import { TbBox } from "react-icons/tb";
import { FormGroup } from "~/components/Fields/FormGroup";
import { SelectField } from "~/components/Fields/SelectField";
import { TextareaInput } from "~/components/Fields/TextareaInput";
import { TextInput } from "~/components/Fields/TextInput";
import { HStack } from "~/components/HStack";
import { ComparatorEnum } from "~/modules/strategies/types";
import { EligibilityCreateDTO } from "../types";

export interface EligibilityFormProps {
  errors: Record<string, string>;
  initialFieldName?: EligibilityCreateDTO["fieldName"];
  initialFieldValue?: EligibilityCreateDTO["fieldValue"];
  initialFieldComparator?: EligibilityCreateDTO["fieldComparator"];
}

export const EligibilityForm = ({
  errors,
  initialFieldName,
  initialFieldValue,
  initialFieldComparator,
}: EligibilityFormProps) => {
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
              {
                value: ComparatorEnum.Equals,
                label: "Equals",
                icon: <FaEquals />,
              },
              {
                value: ComparatorEnum.Contains,
                label: "Contains",
                icon: <TbBox />,
              },
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

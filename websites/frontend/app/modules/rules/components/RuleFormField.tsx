import { SelectField } from "~/components/Fields/Select/SelectField";
import { TagInput } from "~/components/Fields/TagInput";
import { TextInput } from "~/components/Fields/TextInput";
import { ComparatorEnum } from "../types";

export interface RuleFormFieldsProps {
  initialFieldName: string;
  initialFieldComparator: string;
  initialFieldValue: string;
}

export const RuleFormField = ({
  initialFieldName,
  initialFieldComparator,
  initialFieldValue,
}: RuleFormFieldsProps) => {
  return (
    <div className="flex flex-row gap-2 w-full">
      <TextInput
        hiddenLabel
        label="Field name"
        placeholder="e.g: email"
        defaultValue={initialFieldName}
        name="field-name"
        className="w-full md:w-40"
      />

      <SelectField
        hiddenLabel
        name="field-comparator"
        label="Field comparator"
        defaultValue={initialFieldComparator}
        options={[
          {
            value: ComparatorEnum.Equals,
            label: "is in array",
          },
          {
            value: ComparatorEnum.Contains,
            label: "matches in array",
          },
        ]}
      />

      <TagInput
        defaultValue={initialFieldValue ? initialFieldValue.split("\n") : []}
      />
    </div>
  );
};

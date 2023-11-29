import { SelectField } from "~/components/Fields/Select/SelectField";
import { TagInput } from "~/components/Fields/TagInput";
import { TextInput } from "~/components/Fields/TextInput";
import { ComparatorEnum } from "~/modules/rules/types";
import { TargetEntity } from "../types";
import { useState } from "react";

export interface StrategyRuleFormFieldProps {
  initialFieldName: string;
  initialFieldComparator: string;
  initialFieldValue: string;
  index: number;
  ruleIndex: number;
}

export const StrategyRuleFormField = ({
  initialFieldName,
  initialFieldComparator,
  initialFieldValue,
  index,
  ruleIndex,
}: StrategyRuleFormFieldProps) => {
  const [targetEntity, setTargetEntity] = useState(TargetEntity.Field);

  const targetOptions = [
    {
      value: TargetEntity.Field,
      label: "field",
    },
  ];

  return (
    <div className="flex flex-row gap-2 w-full">
      {targetOptions.length > 1 ? (
        <SelectField
          hiddenLabel
          name={`strategies[${index}][rules][${ruleIndex}][target-entity]`}
          label="Target entity"
          defaultValue={targetEntity}
          value={targetEntity}
          options={targetOptions}
          onValueChange={(str) => setTargetEntity(str as TargetEntity)}
        />
      ) : (
        <input
          type="hidden"
          name={`strategies[${index}][rules][${ruleIndex}][target-entity]`}
          value={TargetEntity.Field}
        />
      )}
      {targetEntity === TargetEntity.Field ? (
        <>
          <TextInput
            hiddenLabel
            label="Field name"
            placeholder="e.g: email"
            defaultValue={initialFieldName}
            name={`strategies[${index}][rules][${ruleIndex}][field-name]`}
            className="w-full md:w-40"
          />

          <SelectField
            hiddenLabel
            name={`strategies[${index}][rules][${ruleIndex}][field-comparator]`}
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
        </>
      ) : (
        <>
          <input
            type="hidden"
            name={`strategies[${index}][rules][${ruleIndex}][field-name]`}
            value={undefined}
          />
          <input
            type="hidden"
            name={`strategies[${index}][rules][${ruleIndex}][field-comparator]`}
            value={undefined}
          />
        </>
      )}

      {targetEntity === TargetEntity.Field ? (
        <TagInput
          defaultValue={initialFieldValue ? initialFieldValue.split("\n") : []}
          name={`strategies[${index}][rules][${ruleIndex}][field-value]`}
        />
      ) : (
        <input
          type="hidden"
          name={`strategies[${index}][rules][${ruleIndex}][field-value]`}
          value={undefined}
        />
      )}
    </div>
  );
};

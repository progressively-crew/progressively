import { SelectField } from "~/components/Fields/Select/SelectField";
import { TagInput } from "~/components/Fields/TagInput";
import { TextInput } from "~/components/Fields/TextInput";
import { ComparatorEnum } from "~/modules/rules/types";
import { TargetEntity } from "../types";
import { useState } from "react";
import { Segment } from "~/modules/segments/types";

export interface StrategyRuleFormFieldProps {
  initialFieldName: string;
  initialFieldComparator: string;
  initialFieldValue: string;
  initialSegmentUuid?: string;
  segments: Array<Segment>;
}

export const StrategyRuleFormField = ({
  initialFieldName,
  initialFieldComparator,
  initialFieldValue,
  initialSegmentUuid,
  segments,
}: StrategyRuleFormFieldProps) => {
  const [targetEntity, setTargetEntity] = useState(
    initialSegmentUuid ? TargetEntity.Segment : TargetEntity.Field
  );

  const targetOptions = [
    {
      value: TargetEntity.Field,
      label: "field",
    },
  ];

  if (segments.length > 0) {
    targetOptions.push({
      value: TargetEntity.Segment,
      label: "in segment",
    });
  }

  return (
    <div className="flex flex-row gap-2 w-full">
      {targetOptions.length > 1 ? (
        <SelectField
          hiddenLabel
          name="target-entity"
          label="Target entity"
          defaultValue={targetEntity}
          options={targetOptions}
          onValueChange={(str) => setTargetEntity(str as TargetEntity)}
        />
      ) : (
        <input type="hidden" name="target-entity" value={TargetEntity.Field} />
      )}
      {targetEntity === TargetEntity.Field ? (
        <>
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
        </>
      ) : (
        <>
          <input type="hidden" name="field-comparator" value={undefined} />
          <input type="hidden" name="field-name" value={undefined} />
        </>
      )}
      {targetEntity === TargetEntity.Segment ? (
        <SelectField
          hiddenLabel
          name="segmentUuid"
          label="Segment"
          defaultValue={initialSegmentUuid || segments[0].uuid}
          options={segments.map((segment) => ({
            value: segment.uuid,
            label: segment.name,
          }))}
        />
      ) : (
        <input type="hidden" name="segmentUuid" value={undefined} />
      )}

      {targetEntity === TargetEntity.Field ? (
        <TagInput
          defaultValue={initialFieldValue ? initialFieldValue.split("\n") : []}
        />
      ) : (
        <input type="hidden" name="field-value" value={undefined} />
      )}
    </div>
  );
};

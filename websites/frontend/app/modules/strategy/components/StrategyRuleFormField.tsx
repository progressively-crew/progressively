import { SelectField } from "~/components/Fields/Select/SelectField";
import { TagInput } from "~/components/Fields/TagInput";
import { TextInput } from "~/components/Fields/TextInput";
import { ComparatorEnum, Rule } from "~/modules/rules/types";
import { TargetEntity } from "../types";
import { useState } from "react";
import { Segment } from "~/modules/segments/types";

export interface StrategyRuleFormFieldProps {
  rule: Rule;
  index: number;
  ruleIndex: number;
  segments?: Array<Segment>;
}

export const StrategyRuleFormField = ({
  rule,
  index,
  ruleIndex,
  segments,
}: StrategyRuleFormFieldProps) => {
  const isSegmentRelated = segments && segments.length > 0 && rule.segmentUuid;
  const [targetEntity, setTargetEntity] = useState(
    isSegmentRelated ? TargetEntity.Segment : TargetEntity.Field
  );

  const [segmentUuid, setSegmentUuid] = useState(rule.segmentUuid);

  const targetOptions = [
    {
      value: TargetEntity.Field,
      label: "field",
    },
  ];

  if (segments && segments.length > 0) {
    targetOptions.push({
      value: TargetEntity.Segment,
      label: "in segment",
    });
  }

  return (
    <div className="flex flex-col md:flex-row gap-2 w-full">
      {targetOptions.length > 1 ? (
        <>
          <SelectField
            hiddenLabel
            name={`strategies[${index}][rules][${ruleIndex}][target-entity]`}
            label="Target entity"
            defaultValue={targetEntity}
            value={targetEntity}
            options={targetOptions}
            onValueChange={(str) => setTargetEntity(str as TargetEntity)}
          />
          {targetEntity === TargetEntity.Segment && (
            <SelectField
              hiddenLabel
              name={`strategies[${index}][rules][${ruleIndex}][segmentUuid]`}
              label="Segment"
              value={segmentUuid}
              options={
                segments?.map((s) => ({ label: s.name, value: s.uuid })) || []
              }
              onValueChange={setSegmentUuid}
            />
          )}
        </>
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
            defaultValue={rule.fieldName}
            name={`strategies[${index}][rules][${ruleIndex}][field-name]`}
            className="w-full md:w-40"
          />

          <SelectField
            hiddenLabel
            name={`strategies[${index}][rules][${ruleIndex}][field-comparator]`}
            label="Field comparator"
            defaultValue={rule.fieldComparator}
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
          defaultValue={rule.fieldValue ? rule.fieldValue.split("\n") : []}
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

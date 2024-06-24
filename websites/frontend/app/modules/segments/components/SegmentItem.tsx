import { Card, CardContent } from "~/components/Card";
import { RuleList } from "~/modules/strategy/components/StrategyFormFields/RuleList";
import { Segment } from "../types";
import { IoMdClose } from "react-icons/io";
import { IconButton } from "~/components/Buttons/IconButton";
import { useDeleteSegment } from "../hooks/useDeleteSegment";
import { TextInput } from "~/components/Fields/TextInput";
import { useState } from "react";
import { Rule } from "~/modules/rules/types";
import { createEmptyRule } from "~/modules/rules/services/createEmptyRule";

export interface SegmentItemProps {
  segment: Segment;
  index: number;
}

export const SegmentItem = ({ segment, index }: SegmentItemProps) => {
  const [ruleList, setRuleList] = useState<Array<Rule>>(
    segment.segmentRules || []
  );
  const { isDeletingSegment, deleteSegmentFormId } = useDeleteSegment(segment);

  const addRule = () => {
    setRuleList((s) => [...s, createEmptyRule()]);
  };

  const removeRule = (rule: Rule) => {
    setRuleList((s) => s.filter((r) => r.uuid !== rule.uuid));
  };

  return (
    <div className="bg-gray-100 p-4 rounded-xl" key={segment.uuid}>
      <div className="flex flex-row gap-4 justify-between items-center pb-4">
        <input
          type="hidden"
          name={`strategies[${index}][uuid]`}
          value={segment.uuid}
        />
        <TextInput
          name={`strategies[${index}][name]`}
          label="Segment name"
          defaultValue={segment.name}
        />

        <IconButton
          form={deleteSegmentFormId}
          type="submit"
          isLoading={isDeletingSegment}
          loadingText="Deleting a segment..."
          icon={<IoMdClose className="text-xl" />}
          tooltip="Delete segment"
        />
      </div>

      <Card>
        <CardContent>
          <RuleList
            rules={ruleList}
            onRemoveRule={removeRule}
            index={index}
            onAddRule={addRule}
          />
        </CardContent>
      </Card>
    </div>
  );
};

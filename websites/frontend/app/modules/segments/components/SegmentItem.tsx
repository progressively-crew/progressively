import { Card, CardContent } from "~/components/Card";
import { RuleList } from "~/modules/strategy/components/StrategyFormFields/RuleList";
import { Segment } from "../types";
import { IoMdClose } from "react-icons/io";
import { IconButton } from "~/components/Buttons/IconButton";
import { Typography } from "~/components/Typography";
import { useDeleteSegment } from "../hooks/useDeleteSegment";
import { TextInput } from "~/components/Fields/TextInput";

export interface SegmentItemProps {
  segment: Segment;
  index: number;
}

export const SegmentItem = ({ segment, index }: SegmentItemProps) => {
  const ruleList = segment.segmentRules;
  const { isDeletingSegment, deleteSegmentFormId } = useDeleteSegment(segment);

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
          hiddenLabel
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
            onRemoveRule={() => undefined}
            index={index}
            onAddRule={() => undefined}
          />
        </CardContent>
      </Card>
    </div>
  );
};

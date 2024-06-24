import { Card, CardContent } from "~/components/Card";
import { RuleList } from "~/modules/strategy/components/StrategyFormFields/RuleList";
import { Segment } from "../types";
import { IoMdClose } from "react-icons/io";
import { IconButton } from "~/components/Buttons/IconButton";
import { Typography } from "~/components/Typography";
import { useDeleteSegment } from "../hooks/useDeleteSegment";

export interface SegmentItemProps {
  segment: Segment;
}

export const SegmentItem = ({ segment }: SegmentItemProps) => {
  const ruleList = segment.segmentRules;
  const { isDeletingStrategy, deleteSegmentFormId } = useDeleteSegment(segment);

  return (
    <div className="bg-gray-100 p-4 rounded-xl" key={segment.uuid}>
      <div className="flex flex-row gap-4 justify-between items-center pb-4">
        <Typography as="h2" className="font-semibold">
          {segment.name}
        </Typography>
        <IconButton
          form={deleteSegmentFormId}
          type="submit"
          isLoading={isDeletingStrategy}
          loadingText="Deleting a strategy..."
          icon={<IoMdClose className="text-xl" />}
          tooltip="Delete strategy"
        />
      </div>

      <Card>
        <CardContent>
          <RuleList
            rules={ruleList}
            onRemoveRule={() => undefined}
            index={0}
            onAddRule={() => undefined}
          />
        </CardContent>
      </Card>
    </div>
  );
};

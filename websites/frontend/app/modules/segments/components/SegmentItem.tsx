import { Card, CardContent } from "~/components/Card";
import { RuleList } from "~/modules/strategy/components/StrategyFormFields/RuleList";
import { Segment } from "../types";

export interface SegmentItemProps {
  segment: Segment;
}

export const SegmentItem = ({ segment }: SegmentItemProps) => {
  const ruleList = segment.segmentRules;
  return (
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
  );
};

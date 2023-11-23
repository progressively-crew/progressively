import { IconButton } from "~/components/Buttons/IconButton";
import { Rule } from "~/modules/rules/types";
import { StrategyRuleFormField } from "../StrategyRuleFormField";
import { Segment } from "~/modules/segments/types";
import { PiTrashThin } from "react-icons/pi";

export interface RuleListProps {
  rules: Array<Rule>;
  segments: Array<Segment>;
  onRemoveRule: (rule: Rule) => void;
  index: number;
}

export const RuleList = ({
  rules,
  segments,
  onRemoveRule,
  index,
}: RuleListProps) => {
  return (
    <div className={`flex flex-col w-full gap-2`}>
      {rules.map((rule, ruleIndex: number) => {
        return (
          <div
            key={rule.uuid}
            className="flex flex-row gap-4 justify-between items-start"
          >
            <StrategyRuleFormField
              initialFieldName={rule.fieldName}
              initialFieldComparator={rule.fieldComparator}
              initialFieldValue={rule.fieldValue}
              initialSegmentUuid={rule.segmentUuid}
              segments={segments}
              index={index}
              ruleIndex={ruleIndex}
            />

            <div className="pt-1">
              <IconButton
                type="button"
                icon={<PiTrashThin className="text-xl text-slate-400" />}
                tooltip="Remove rule"
                onClick={() => onRemoveRule(rule)}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

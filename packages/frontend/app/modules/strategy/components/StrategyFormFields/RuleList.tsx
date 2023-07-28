import { IconButton } from "~/components/Buttons/IconButton";
import { Rule } from "~/modules/rules/types";
import { StrategyRuleFormField } from "../StrategyRuleFormField";
import { Segment } from "~/modules/segments/types";
import { TbTrashX } from "react-icons/tb";

export interface RuleListProps {
  rules: Array<Rule>;
  currentlyDeletingRuleUuid?: string;
  formId: string;
  segments: Array<Segment>;
}

export const RuleList = ({
  rules,
  currentlyDeletingRuleUuid,
  formId,
  segments,
}: RuleListProps) => {
  return (
    <div className={`flex flex-col w-full gap-2`}>
      {rules.map((rule) => {
        const isDeleting = currentlyDeletingRuleUuid === rule.uuid;

        return (
          <div
            key={rule.uuid}
            className="flex flex-row gap-4 justify-between items-start"
          >
            <input type="hidden" value={rule.uuid} name="ruleUuid" />

            <StrategyRuleFormField
              initialFieldName={rule.fieldName}
              initialFieldComparator={rule.fieldComparator}
              initialFieldValue={rule.fieldValue}
              initialSegmentUuid={rule.segmentUuid}
              segments={segments}
            />

            <IconButton
              form={formId}
              type="submit"
              isLoading={isDeleting}
              loadingText="Deleting a rule..."
              icon={<TbTrashX />}
              tooltip="Remove rule"
              value={rule.uuid}
              name="ruleId"
            />
          </div>
        );
      })}
    </div>
  );
};

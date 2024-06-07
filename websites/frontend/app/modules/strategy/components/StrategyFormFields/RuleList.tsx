import { IconButton } from "~/components/Buttons/IconButton";
import { Rule } from "~/modules/rules/types";
import { StrategyRuleFormField } from "../StrategyRuleFormField";
import { IoMdClose } from "react-icons/io";

export interface RuleListProps {
  rules: Array<Rule>;
  onRemoveRule: (rule: Rule) => void;
  index: number;
}

export const RuleList = ({ rules, onRemoveRule, index }: RuleListProps) => {
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
              index={index}
              ruleIndex={ruleIndex}
            />

            <div className="pt-1">
              <IconButton
                type="button"
                icon={<IoMdClose className="text-xl text-gray-400" />}
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

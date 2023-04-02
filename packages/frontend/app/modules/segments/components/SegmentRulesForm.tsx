import { RuleFormField } from "~/modules/rules/components/RuleFormField";
import { RuleType } from "~/modules/rules/types";

export interface SegmentRulesFormProps {
  rules: Array<RuleType & { uuid: string }>;
}

export const SegmentRulesForm = ({ rules }: SegmentRulesFormProps) => {
  return (
    <div className="flex flex-col gap-1">
      {rules.map((rule) => (
        <div className="bg-gray-50 dark:bg-slate-900 px-6 py-4" key={rule.uuid}>
          <input type="hidden" name="uuid" value={rule.uuid} />
          <RuleFormField
            initialFieldName={rule.fieldName}
            initialFieldComparator={rule.fieldComparator}
            initialFieldValue={rule.fieldValue}
          />
        </div>
      ))}
    </div>
  );
};

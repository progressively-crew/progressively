import { TbTrashX } from "react-icons/tb";
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
          <div className="flex flex-row gap-4 justify-between items-start">
            <div className="flex-1">
              <RuleFormField
                initialFieldName={rule.fieldName}
                initialFieldComparator={rule.fieldComparator}
                initialFieldValue={rule.fieldValue}
              />
            </div>

            <button
              type="submit"
              value={rule.uuid}
              form={"delete-rule"}
              name="ruleId"
              className="rounded bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-100 dark:hover:text-slate-100 w-6 h-8 flex items-center justify-center"
            >
              <TbTrashX title="Remove rule" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

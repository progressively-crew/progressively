import { TbTrashX } from "react-icons/tb";
import { IconButton } from "~/components/Buttons/IconButton";
import { Tag } from "~/components/Tag";
import { RuleFormField } from "~/modules/rules/components/RuleFormField";
import { RuleType } from "~/modules/rules/types";

export interface SegmentRulesFormProps {
  rules: Array<RuleType & { uuid: string }>;
}

export const SegmentRulesForm = ({ rules }: SegmentRulesFormProps) => {
  return (
    <div className="grid grid-cols-[70px_1fr] gap-x-4 gap-y-2">
      <div className="pt-2">
        <Tag variant="PRIMARY">When</Tag>
      </div>

      <div className="w-full flex flex-col w-full gap-2">
        {rules.map((rule) => (
          <div
            key={rule.uuid}
            className="flex flex-row gap-4 justify-between items-start"
          >
            <input type="hidden" name="uuid" value={rule.uuid} />

            <RuleFormField
              initialFieldName={rule.fieldName}
              initialFieldComparator={rule.fieldComparator}
              initialFieldValue={rule.fieldValue}
            />

            <IconButton
              form={"delete-rule"}
              type="submit"
              loadingText="Deleting a rule..."
              icon={<TbTrashX />}
              tooltip="Remove rule"
              value={rule.uuid}
              name="ruleId"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

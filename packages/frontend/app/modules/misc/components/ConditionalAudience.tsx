import { MenuButton } from "~/components/MenuButton";
import { RuleFormField } from "~/modules/rules/components/RuleFormField";
import { ComparatorEnum } from "~/modules/rules/types";

export interface ConditionalAudienceProps {
  removeLink: string;
  uuid: string;
  fieldName: string;
  fieldValue: string;
  fieldComparator: ComparatorEnum;
  showAdditionalFields?: boolean;
}

export const ConditionalAudience = ({
  removeLink,
  fieldName,
  fieldValue,
  fieldComparator,
  uuid,
  showAdditionalFields,
}: ConditionalAudienceProps) => {
  return (
    <div className="bg-gray-50 dark:bg-slate-900 px-6 py-4">
      <input type="hidden" name="uuid" value={uuid} />
      <div className="flex flex-row gap-2">
        <div className="flex-1">
          <RuleFormField
            initialFieldName={fieldName}
            initialFieldComparator={fieldComparator}
            initialFieldValue={fieldValue}
          />

          {showAdditionalFields && (
            <>
              <div className="h-2" />
            </>
          )}
        </div>

        <MenuButton
          variant="action"
          items={[
            {
              label: "Remove",
              href: removeLink,
              noInitial: true,
            },
          ]}
          label={"Additional actions on rule"}
        />
      </div>
    </div>
  );
};

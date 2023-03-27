import { MenuButton } from "~/components/MenuButton";
import { RuleFormField } from "~/modules/rules/components/RuleFormField";
import { ComparatorEnum } from "~/modules/rules/types";
import { ValuesToServeFields } from "~/modules/strategies/components/ValuesToServeFields";
import { StrategyValueToServe } from "~/modules/strategies/types";
import { Variant } from "~/modules/variants/types";

export interface ConditionalAudienceProps {
  removeLink: string;
  uuid: string;
  fieldName: string;
  fieldValue: string;
  fieldComparator: ComparatorEnum;
  variants?: Array<Variant>;
  valueToServe?: string;
  valueToServeType?: StrategyValueToServe;
  showAdditionalFields?: boolean;
}

export const ConditionalAudience = ({
  removeLink,
  valueToServe,
  valueToServeType,
  fieldName,
  fieldValue,
  fieldComparator,
  uuid,
  variants,
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
              <ValuesToServeFields
                valueToServe={valueToServe}
                valueToServeType={valueToServeType}
                variants={variants}
              />
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

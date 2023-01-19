import { DeleteButton } from "~/components/Buttons/DeleteButton";
import { SelectField } from "~/components/Fields/SelectField";
import { TagInput } from "~/components/Fields/TagInput";
import { TextInput } from "~/components/Fields/TextInput";
import { Typography } from "~/components/Typography";
import { ComparatorEnum } from "~/modules/strategies/types";
import { UpsertEligibilityDTO } from "../types";

export interface ConditionalAudienceProps {
  eligiblity: UpsertEligibilityDTO;
  removeLink: string;
}

export const ConditionalAudience = ({
  eligiblity,
  removeLink,
}: ConditionalAudienceProps) => {
  return (
    <div className="bg-gray-50 dark:bg-slate-900 px-6 py-4 flex flex-row gap-4">
      <Typography className="shrink-0 py-2">When field</Typography>

      <div className="shrink-0">
        <TextInput
          hiddenLabel
          label="Field name"
          placeholder="e.g: email"
          defaultValue={eligiblity.fieldName}
          name="field-name"
          form="eligibility-form"
          className="w-40"
        />
      </div>

      <div className="shrink-0">
        <SelectField
          hiddenLabel
          name="field-comparator"
          label="Field comparator"
          defaultValue={eligiblity.fieldComparator}
          options={[
            {
              value: ComparatorEnum.Equals,
              label: "Equals",
            },
            {
              value: ComparatorEnum.Contains,
              label: "Contains",
            },
          ]}
          form="eligibility-form"
        />
      </div>

      <TagInput
        defaultValue={
          eligiblity.fieldValue ? eligiblity.fieldValue.split("\n") : []
        }
      />

      <div className="py-1">
        <DeleteButton size="S" variant="secondary" to={removeLink}>
          Remove
        </DeleteButton>
      </div>
    </div>
  );
};

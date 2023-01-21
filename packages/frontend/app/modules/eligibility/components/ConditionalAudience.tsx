import { DeleteButton } from "~/components/Buttons/DeleteButton";
import { SelectField, SelectOption } from "~/components/Fields/SelectField";
import { TagInput } from "~/components/Fields/TagInput";
import { TextInput } from "~/components/Fields/TextInput";
import { Typography } from "~/components/Typography";
import { ComparatorEnum } from "~/modules/strategies/types";
import { UpsertEligibilityDTO } from "../types";

export interface ConditionalAudienceProps {
  eligiblity: UpsertEligibilityDTO;
  removeLink: string;
  valuesToServe?: Array<SelectOption>;
  uuid: string;
  fieldName: string;
  fieldValue: string;
  fieldComparator: ComparatorEnum;
}

export const ConditionalAudience = ({
  removeLink,
  valuesToServe,
  fieldName,
  fieldValue,
  fieldComparator,
  uuid,
}: ConditionalAudienceProps) => {
  return (
    <div className="bg-gray-50 dark:bg-slate-900 px-6 py-4 flex flex-row gap-4">
      <input type="hidden" name="eligibility-id" value={uuid} />
      <Typography className="shrink-0 py-2">When field</Typography>

      <div className="shrink-0">
        <TextInput
          hiddenLabel
          label="Field name"
          placeholder="e.g: email"
          defaultValue={fieldName}
          name="field-name"
          className="w-40"
        />
      </div>

      <div className="shrink-0">
        <SelectField
          hiddenLabel
          name="field-comparator"
          label="Field comparator"
          defaultValue={fieldComparator}
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
        />
      </div>

      <TagInput defaultValue={fieldValue ? fieldValue.split("\n") : []} />

      {valuesToServe ? (
        <SelectField
          hiddenLabel
          name={"value-to-serve"}
          label={"Values to serve"}
          options={valuesToServe}
        />
      ) : null}

      <div className="py-1">
        <DeleteButton size="S" variant="secondary" to={removeLink}>
          Remove
        </DeleteButton>
      </div>
    </div>
  );
};

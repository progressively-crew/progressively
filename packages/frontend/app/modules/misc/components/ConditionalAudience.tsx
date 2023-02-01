import { useState } from "react";
import { DeleteButton } from "~/components/Buttons/DeleteButton";
import { SelectField } from "~/components/Fields/Select/SelectField";
import { TagInput } from "~/components/Fields/TagInput";
import { TextInput } from "~/components/Fields/TextInput";
import { Typography } from "~/components/Typography";
import {
  ComparatorEnum,
  StrategyValueToServe,
} from "~/modules/strategies/types";
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

const AdditionalFields = ({
  valueToServe,
  valueToServeType,
  variants,
}: {
  valueToServe: ConditionalAudienceProps["valueToServe"];
  valueToServeType: ConditionalAudienceProps["valueToServeType"];
  variants: ConditionalAudienceProps["variants"];
}) => {
  const [status, setStatus] = useState(
    valueToServeType || StrategyValueToServe.Boolean
  );

  const hasVariants = variants && variants.length > 0;

  const valueOptions = [
    {
      value: StrategyValueToServe.Boolean,
      label: "the boolean",
    },
    {
      value: StrategyValueToServe.String,
      label: "the string",
    },
  ];

  if (hasVariants) {
    valueOptions.push({
      value: StrategyValueToServe.Variant,
      label: "the variant",
    });
  }

  return (
    <>
      <Typography className="shrink-0 py-2">Serve</Typography>

      <SelectField
        hiddenLabel
        label="What value to you want to serve?"
        name={"value-to-serve-type"}
        defaultValue={valueToServeType || valueOptions[0].value}
        options={valueOptions}
        onValueChange={(str) => setStatus(str as StrategyValueToServe)}
      />

      {status === StrategyValueToServe.Variant && hasVariants && (
        <SelectField
          hiddenLabel
          name="value-to-serve"
          label="Variant value to serve"
          defaultValue={
            valueToServeType === StrategyValueToServe.Variant
              ? valueToServe || variants[0].value
              : variants[0].value
          }
          options={variants.map((v) => ({
            label: v.value,
            value: v.value,
          }))}
        />
      )}

      {status === StrategyValueToServe.Boolean && (
        <SelectField
          hiddenLabel
          name="value-to-serve"
          label="Boolean value to serve"
          defaultValue={
            valueToServeType === StrategyValueToServe.Boolean
              ? valueToServe
              : ""
          }
          options={[
            { value: "true", label: "True" },
            { value: "false", label: "False" },
          ]}
        />
      )}

      {status === StrategyValueToServe.String && (
        <TextInput
          label="String value to serve"
          placeholder="e.g: A"
          name="value-to-serve"
          hiddenLabel
          defaultValue={
            valueToServeType === StrategyValueToServe.String ? valueToServe : ""
          }
          className="w-40"
        />
      )}
    </>
  );
};

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
  const gridClassName = showAdditionalFields
    ? "grid grid-cols-[auto_auto_auto_1fr] gap-4"
    : "grid grid-cols-[auto_auto_auto_1fr_auto] gap-4";

  return (
    <div className="bg-gray-50 dark:bg-slate-900 px-6 py-4">
      <div className={gridClassName}>
        <div>
          <input type="hidden" name="uuid" value={uuid} />
          <Typography className="shrink-0 py-2">When field</Typography>
        </div>

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
                label: "is in array",
              },
              {
                value: ComparatorEnum.Contains,
                label: "matches in array",
              },
            ]}
          />
        </div>

        <TagInput defaultValue={fieldValue ? fieldValue.split("\n") : []} />

        {showAdditionalFields && (
          <AdditionalFields
            valueToServe={valueToServe}
            valueToServeType={valueToServeType}
            variants={variants}
          />
        )}

        {!showAdditionalFields && (
          <DeleteButton variant="secondary" to={removeLink}>
            Remove
          </DeleteButton>
        )}
      </div>

      {showAdditionalFields && (
        <div className="pt-4 flex">
          <DeleteButton variant="secondary" to={removeLink}>
            Remove
          </DeleteButton>
        </div>
      )}
    </div>
  );
};

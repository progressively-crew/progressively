import { useState } from "react";
import { SelectField } from "~/components/Fields/Select/SelectField";
import { TextInput } from "~/components/Fields/TextInput";
import { Typography } from "~/components/Typography";
import { Variant } from "~/modules/variants/types";
import { ValueToServe } from "../../types";
import { PercentageField } from "~/components/Fields/PercentageField";
import { VariantFields } from "./VariantFields";

export interface ValuesToServeFieldsProps {
  variants?: Array<Variant & { rolloutPercentage: number }>;
  valueToServe?: string;
  valueToServeType?: ValueToServe;
  rolloutPercentage: number;
}

export const StrategyFormFields = ({
  valueToServe,
  valueToServeType,
  variants,
  rolloutPercentage,
}: ValuesToServeFieldsProps) => {
  const [status, setStatus] = useState(
    valueToServeType || ValueToServe.Boolean
  );

  const hasVariants = variants && variants.length > 0;

  const valueOptions = [
    {
      value: ValueToServe.Boolean,
      label: `true`,
    },
    {
      value: ValueToServe.String,
      label: "the custom string",
    },
  ];

  if (hasVariants) {
    valueOptions.push({
      value: ValueToServe.Variant,
      label: "the variants",
    });
  }

  return (
    <div>
      <div className="flex flex-row gap-2 items-center flex-wrap">
        <Typography className="shrink-0 py-2 font-bold pr-2">Serve</Typography>

        <SelectField
          hiddenLabel
          label="What value to you want to serve?"
          name={"value-to-serve-type"}
          defaultValue={valueToServeType || valueOptions[0].value}
          options={valueOptions}
          onValueChange={(str) => setStatus(str as ValueToServe)}
        />

        {status === ValueToServe.String && (
          <TextInput
            label="String value to serve"
            placeholder="e.g: A"
            name="value-to-serve"
            hiddenLabel
            defaultValue={
              valueToServeType === ValueToServe.String ? valueToServe : ""
            }
            className="w-52"
          />
        )}

        {status !== ValueToServe.Variant && (
          <>
            <Typography>to</Typography>

            <PercentageField
              name={"rolloutPercentage"}
              initialValue={rolloutPercentage}
              label={"Rollout percentage"}
              hiddenLabel
            />

            <Typography>of the audience</Typography>
          </>
        )}
      </div>

      {status === ValueToServe.Variant && hasVariants && (
        <div className="pt-4">
          <VariantFields variants={variants || []} />
        </div>
      )}
    </div>
  );
};

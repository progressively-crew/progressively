import { useState } from "react";
import { SelectField } from "~/components/Fields/Select/SelectField";
import { TextInput } from "~/components/Fields/TextInput";
import { Typography } from "~/components/Typography";

import { Variant } from "~/modules/variants/types";
import { ValueToServe } from "../types";

export interface ValuesToServeFieldsProps {
  variants?: Array<Variant>;
  valueToServe?: string;
  valueToServeType?: ValueToServe;
}

export const ValueToServeFormField = ({
  valueToServe,
  valueToServeType,
  variants,
}: ValuesToServeFieldsProps) => {
  const [status, setStatus] = useState(
    valueToServeType || ValueToServe.Boolean
  );

  const hasVariants = variants && variants.length > 0;

  const valueOptions = [
    {
      value: ValueToServe.Boolean,
      label: "the boolean",
    },
    {
      value: ValueToServe.String,
      label: "the string",
    },
  ];

  if (hasVariants) {
    valueOptions.push({
      value: ValueToServe.Variant,
      label: "the variant",
    });
  }

  return (
    <div className="flex flex-row gap-2">
      <Typography className="shrink-0 py-2 w-28">Serve</Typography>

      <SelectField
        hiddenLabel
        label="What value to you want to serve?"
        name={"value-to-serve-type"}
        defaultValue={valueToServeType || valueOptions[0].value}
        options={valueOptions}
        onValueChange={(str) => setStatus(str as ValueToServe)}
      />

      {status === ValueToServe.Variant && hasVariants && (
        <SelectField
          hiddenLabel
          name="value-to-serve"
          label="Variant value to serve"
          defaultValue={
            valueToServeType === ValueToServe.Variant
              ? valueToServe || variants[0].value
              : variants[0].value
          }
          options={variants.map((v) => ({
            label: v.value,
            value: v.value,
          }))}
        />
      )}

      {status === ValueToServe.Boolean && (
        <SelectField
          hiddenLabel
          name="value-to-serve"
          label="Boolean value to serve"
          defaultValue={
            valueToServeType === ValueToServe.Boolean ? valueToServe : ""
          }
          options={[
            { value: "true", label: "True" },
            { value: "false", label: "False" },
          ]}
        />
      )}

      {status === ValueToServe.String && (
        <TextInput
          label="String value to serve"
          placeholder="e.g: A"
          name="value-to-serve"
          hiddenLabel
          defaultValue={
            valueToServeType === ValueToServe.String ? valueToServe : ""
          }
          className="w-40"
        />
      )}
    </div>
  );
};

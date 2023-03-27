import { useState } from "react";
import { SelectField } from "~/components/Fields/Select/SelectField";
import { TextInput } from "~/components/Fields/TextInput";
import { Typography } from "~/components/Typography";

import { Variant } from "~/modules/variants/types";
import { StrategyValueToServe } from "../types";

export interface ValuesToServeFieldsProps {
  variants?: Array<Variant>;
  valueToServe?: string;
  valueToServeType?: StrategyValueToServe;
}

export const ValuesToServeFields = ({
  valueToServe,
  valueToServeType,
  variants,
}: ValuesToServeFieldsProps) => {
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
    <div className="flex flex-row gap-2">
      <Typography className="shrink-0 py-2 w-28">Serve</Typography>

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
    </div>
  );
};

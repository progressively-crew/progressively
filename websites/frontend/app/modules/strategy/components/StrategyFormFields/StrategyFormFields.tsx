import { useState } from "react";
import { SelectField } from "~/components/Fields/Select/SelectField";
import { Typography } from "~/components/Typography";
import { Variant } from "~/modules/variants/types";
import { ValueToServe, WhenPredicate } from "../../types";
import { PercentageField } from "~/components/Fields/PercentageField";
import { VariantFields } from "./VariantFields";
import { WhenField } from "../WhenField";

export interface ValuesToServeFieldsProps {
  variants?: Array<Variant & { rolloutPercentage: number }>;
  valueToServeType?: ValueToServe;
  rolloutPercentage: number;
  index: number;
  whenPredicate: WhenPredicate;
  whenTimestamp?: string;
}

export const StrategyFormFields = ({
  valueToServeType,
  variants,
  rolloutPercentage,
  index,
  whenPredicate,
  whenTimestamp,
}: ValuesToServeFieldsProps) => {
  const valueOptions = [
    {
      value: ValueToServe.Boolean,
      label: `true`,
    },
    {
      value: ValueToServe.Variant,
      label: "the variants",
    },
  ];

  const [status, setStatus] = useState(
    valueToServeType || valueOptions[0].value
  );

  if (status === ValueToServe.Variant) {
    return (
      <div>
        <div className="flex flex-row gap-4 flex-wrap items-center">
          <SelectField
            hiddenLabel
            label="What value to you want to serve?"
            name={`strategies[${index}][value-to-serve-type]`}
            value={status}
            options={valueOptions}
            onValueChange={(str) => setStatus(str as ValueToServe)}
          />

          <WhenField
            whenPredicateName={`strategies[${index}][whenPredicate]`}
            whenDateName={`strategies[${index}][whenTimestamp]`}
            initialWhenPredicate={whenPredicate}
            initialWhenTimestamp={whenTimestamp}
          />
        </div>

        <div className="pt-4">
          <VariantFields variants={variants || []} index={index} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-4">
        <SelectField
          hiddenLabel
          label="What value to you want to serve?"
          name={`strategies[${index}][value-to-serve-type]`}
          value={status}
          options={valueOptions}
          onValueChange={(str) => setStatus(str as ValueToServe)}
        />

        {status === ValueToServe.Boolean && (
          <div className="flex-1 flex flex-row items-center gap-2">
            <Typography>to</Typography>

            <PercentageField
              name={`strategies[${index}][rolloutPercentage]`}
              initialValue={rolloutPercentage}
              label={"Rollout percentage"}
              hiddenLabel
            />

            <Typography>of the audience</Typography>

            <WhenField
              whenPredicateName={`strategies[${index}][whenPredicate]`}
              whenDateName={`strategies[${index}][whenTimestamp]`}
              initialWhenPredicate={whenPredicate}
              initialWhenTimestamp={whenTimestamp}
            />
          </div>
        )}
      </div>
    </div>
  );
};

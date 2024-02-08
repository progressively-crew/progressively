import { useState } from "react";
import { SelectField } from "~/components/Fields/Select/SelectField";
import { Typography } from "~/components/Typography";
import { Variant } from "~/modules/variants/types";
import { ValueToServe } from "../../types";
import { PercentageField } from "~/components/Fields/PercentageField";
import { VariantFields } from "./VariantFields";
import { CreateButton } from "~/components/Buttons/CreateButton";
import { useFlag } from "~/modules/flags/contexts/useFlag";
import { useProject } from "~/modules/projects/contexts/useProject";

export interface ValuesToServeFieldsProps {
  variants?: Array<Variant & { rolloutPercentage: number }>;
  valueToServeType?: ValueToServe;
  rolloutPercentage: number;
  index: number;
}

export const StrategyFormFields = ({
  valueToServeType,
  variants,
  rolloutPercentage,
  index,
}: ValuesToServeFieldsProps) => {
  const { flag } = useFlag();
  const { project } = useProject();

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

          {variants && variants.length === 0 ? (
            <CreateButton
              to={`/dashboard/projects/${project.uuid}/flags/${flag.uuid}/audience/variants/create`}
              variant="tertiary"
            >
              Add a variant
            </CreateButton>
          ) : null}
        </div>

        {variants && variants.length > 0 && (
          <div className="pt-4">
            <VariantFields variants={variants || []} index={index} />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-row gap-4">
      <SelectField
        hiddenLabel
        label="What value to you want to serve?"
        name={`strategies[${index}][value-to-serve-type]`}
        value={status}
        options={valueOptions}
        onValueChange={(str) => setStatus(str as ValueToServe)}
      />
      <div className="flex-1 flex flex-row items-center gap-2">
        {status === ValueToServe.Boolean && (
          <>
            <Typography>to</Typography>

            <PercentageField
              name={`strategies[${index}][rolloutPercentage]`}
              initialValue={rolloutPercentage}
              label={"Rollout percentage"}
              hiddenLabel
            />

            <Typography>of the audience</Typography>
          </>
        )}
      </div>
    </div>
  );
};

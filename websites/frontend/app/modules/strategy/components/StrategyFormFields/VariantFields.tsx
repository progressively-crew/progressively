import { DeleteButton } from "~/components/Buttons/DeleteButton";
import { PercentageField } from "~/components/Fields/PercentageField";
import { useEnvironment } from "~/modules/environments/contexts/useEnvironment";
import { useFlagEnv } from "~/modules/flags/contexts/useFlagEnv";
import { Variant } from "~/modules/variants/types";

export interface VariantFieldsProps {
  variants: Array<Variant & { rolloutPercentage: number }>;
  index: number;
}

export const VariantFields = ({ variants, index }: VariantFieldsProps) => {
  const { flagEnv } = useFlagEnv();
  const { environment } = useEnvironment();

  return (
    <div className="grid grid-cols-3 gap-4">
      {variants.map((variant, variantIndex: number) => {
        return (
          <div key={variant.uuid}>
            <input
              type="hidden"
              name={`strategies[${index}][variants][${variantIndex}][uuid]`}
              value={variant.uuid}
            />
            <PercentageField
              name={`strategies[${index}][variants][${variantIndex}][variantRolloutPercentage]`}
              initialValue={variant.rolloutPercentage}
              label={variant.value}
            />
            <DeleteButton
              to={`/dashboard/projects/${environment.projectId}/environments/${environment.uuid}/flags/${flagEnv.flagId}/variants/${variant.uuid}/delete`}
              variant="tertiary"
            >
              Delete a variant
            </DeleteButton>
          </div>
        );
      })}
    </div>
  );
};

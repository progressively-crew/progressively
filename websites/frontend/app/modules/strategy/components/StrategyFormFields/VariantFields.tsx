import { PercentageField } from "~/components/Fields/PercentageField";
import { Variant } from "~/modules/variants/types";

export interface VariantFieldsProps {
  variants: Array<Variant & { rolloutPercentage: number }>;
  index: number;
}

export const VariantFields = ({ variants, index }: VariantFieldsProps) => {
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
          </div>
        );
      })}
    </div>
  );
};

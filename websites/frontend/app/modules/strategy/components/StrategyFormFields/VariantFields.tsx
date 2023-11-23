import { PercentageField } from "~/components/Fields/PercentageField";
import { Variant } from "~/modules/variants/types";

export interface VariantFieldsProps {
  variants: Array<Variant & { rolloutPercentage: number }>;
  index: number;
}

export const VariantFields = ({ variants, index }: VariantFieldsProps) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {variants.map((variant) => {
        return (
          <div key={variant.uuid}>
            <input
              type="hidden"
              name={`strategies[${index}][variantUuid]`}
              value={variant.uuid}
            />
            <PercentageField
              name={`strategies[${index}][variantRolloutPercentage]`}
              initialValue={variant.rolloutPercentage}
              label={variant.value}
            />
          </div>
        );
      })}
    </div>
  );
};

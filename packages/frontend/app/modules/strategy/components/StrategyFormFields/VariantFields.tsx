import { PercentageField } from "~/components/Fields/PercentageField";
import { Variant } from "~/modules/variants/types";

export interface VariantFieldsProps {
  variants: Array<Variant & { rolloutPercentage: number }>;
}

export const VariantFields = ({ variants }: VariantFieldsProps) => {
  return (
    <div className="grid grid-cols-4 gap-2 bg-slate-50 px-8 py-2">
      {variants.map((variant) => {
        return (
          <div key={variant.uuid}>
            <input type="hidden" name="variantUuid" value={variant.uuid} />
            <PercentageField
              name={"variantRolloutPercentage"}
              initialValue={variant.rolloutPercentage}
              label={variant.value}
            />
          </div>
        );
      })}
    </div>
  );
};

import { PercentageField } from "~/components/Fields/PercentageField";
import { Variant } from "~/modules/variants/types";
import { stringToColor } from "~/modules/misc/utils/stringToColor";

export interface VariantFieldsProps {
  variants: Array<Variant & { rolloutPercentage: number }>;
}

export const VariantFields = ({ variants }: VariantFieldsProps) => {
  return (
    <div className="grid grid-cols-3 gap-8">
      {variants.map((variant) => {
        return (
          <div key={variant.uuid} className="border-r-2 border-white  p-4">
            <input type="hidden" name="variantUuid" value={variant.uuid} />
            <PercentageField
              name={"variantRolloutPercentage"}
              initialValue={variant.rolloutPercentage}
              label={variant.value}
              thumbColor={stringToColor(variant.value, 75)}
            />
          </div>
        );
      })}
    </div>
  );
};

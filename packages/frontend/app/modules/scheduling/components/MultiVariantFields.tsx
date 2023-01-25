import React, { useState } from "react";
import { SliderInput } from "~/components/Fields/SliderInput";
import { FlagEnv } from "~/modules/flags/types";
import { SchedulingType } from "~/modules/scheduling/types";
import { Variant } from "~/modules/variants/types";

interface VariantRowProps {
  variant: Variant;
}

const VariantRow = ({ variant }: VariantRowProps) => {
  const [percentage, setPercentage] = useState(100);

  return (
    <SliderInput
      onChange={setPercentage}
      percentageValue={percentage}
      label={"What should be the next rollout percentage for " + variant.value}
      name={"rolloutPercentage"}
    />
  );
};

interface MultiVariantFieldsProps {
  variants: FlagEnv["variants"];
}

export const MultiVariantFields = ({ variants }: MultiVariantFieldsProps) => {
  return (
    <div>
      {variants.map((variant) => (
        <React.Fragment key={variant.uuid}>
          <VariantRow variant={variant} />
          <input type="hidden" name="variantId" value={variant.uuid} />
        </React.Fragment>
      ))}

      <input
        type="hidden"
        name="type"
        value={SchedulingType.UpdateVariantPercentage}
      />
    </div>
  );
};

import { Form } from "@remix-run/react";
import { useState } from "react";
import { SliderInput } from "~/components/Fields/SliderInput";
import { Variant } from "../types";
import { stringToColor } from "~/modules/misc/utils/stringToColor";
import { VariantDot } from "~/modules/flags/components/VariantDot";
import { Typography } from "~/components/Typography";

export interface FormSliderInputProps {
  name: string;
  label: string;
  id: string;
  initialPercentage: number;
  bgColor?: string;
  fgColor?: string;
}

const FormSliderInput = ({
  name,
  label,
  id,
  initialPercentage,
  bgColor,
  fgColor,
}: FormSliderInputProps) => {
  const [percentage, setPercentage] = useState(initialPercentage);

  return (
    <SliderInput
      id={id}
      name={name}
      hiddenLabel
      percentageValue={percentage}
      onChange={setPercentage}
      label={label}
      bgColor={bgColor}
      fgColor={fgColor}
    />
  );
};

export interface VariantTableProps {
  variants: Array<Variant>;
  errors?: Record<string, string>;
}
export const VariantTable = ({ variants }: VariantTableProps) => {
  return (
    <div>
      <Form method="post" id="edit-variant">
        <input type="hidden" name="_type" value="edit-variant" />

        {variants.map((variant, index) => {
          const background = stringToColor(variant.value, 90);
          const color = stringToColor(variant.value, 25);

          return (
            <div key={variant.uuid}>
              <input type="hidden" name="uuid" value={variant.uuid} />
              <input type="hidden" value={variant.value} name={"name"} />
              {variant.isControl && (
                <input type="hidden" name="isControl" value={variant.uuid} />
              )}

              <div
                className={`px-6 py-4 last:border-b-0 border-b border-gray-200 dark:border-slate-700 grid grid-cols-3 gap-6 items-center ${
                  variant.isControl ? "bg-gray-50 dark:bg-slate-800" : ""
                }`}
              >
                <span className="flex flex-row gap-3 items-center text-gray-700 dark:text-slate-200">
                  <VariantDot variant={variant.value} />
                  {variant.value}
                </span>

                <FormSliderInput
                  id={`rolloutPercentage-${index}`}
                  name={`rolloutPercentage`}
                  label={`Variant ${index + 1} rollout percentage`}
                  initialPercentage={variant.rolloutPercentage}
                  bgColor={background}
                  fgColor={color}
                />

                {variant.isControl && (
                  <Typography className="text-xs dark:text-slate-300 text-gray-600">
                    This is the control variant
                  </Typography>
                )}
              </div>
            </div>
          );
        })}
      </Form>
    </div>
  );
};

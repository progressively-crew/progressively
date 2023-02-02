import { Form } from "@remix-run/react";
import { useState } from "react";
import { SliderInput } from "~/components/Fields/SliderInput";
import { Variant } from "../types";
import { stringToColor } from "~/modules/misc/utils/stringToColor";
import { VariantDot } from "~/modules/flags/components/VariantDot";

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

export interface VariantRowProps {
  title: string;
  link?: string;
  description?: React.ReactNode;
  avatar?: React.ReactNode;
  actions?: React.ReactNode;
}

const VariantRow = ({
  title,
  description,
  avatar,
  actions,
}: VariantRowProps) => {
  return (
    <div className="flex flex-row items-center gap-4 justify-between">
      <div className="flex flex-row items-center gap-4">
        {avatar}
        <div className="space-y-1">
          <div className="font-medium leading-none">{title}</div>
          {description && (
            <div className="text-sm text-slate-500 dark:text-slate-400">
              {description}
            </div>
          )}
        </div>
      </div>

      {actions && (
        <div className="flex flex-row gap-8 items-center">{actions}</div>
      )}
    </div>
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
            <div key={variant.uuid} className="p-6">
              <input type="hidden" name="uuid" value={variant.uuid} />
              <input type="hidden" value={variant.value} name={"name"} />
              {variant.isControl && (
                <input type="hidden" name="isControl" value={variant.uuid} />
              )}
              <VariantRow
                key={variant.uuid}
                title={variant.value}
                description={
                  variant.isControl ? `This is the control variant` : undefined
                }
                avatar={<VariantDot size="L" variant={variant.value} />}
                actions={
                  <FormSliderInput
                    id={`rolloutPercentage-${index}`}
                    name={`rolloutPercentage`}
                    label={`Variant ${index + 1} rollout percentage`}
                    initialPercentage={variant.rolloutPercentage}
                    bgColor={background}
                    fgColor={color}
                  />
                }
              />
            </div>
          );
        })}
      </Form>
    </div>
  );
};

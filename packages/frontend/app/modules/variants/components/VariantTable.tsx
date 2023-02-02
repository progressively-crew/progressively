import { Form } from "@remix-run/react";
import { useState } from "react";
import { SliderInput } from "~/components/Fields/SliderInput";
import { Variant } from "../types";
import { stringToColor } from "~/modules/misc/utils/stringToColor";
import { VariantDot } from "~/modules/flags/components/VariantDot";
import { Entity } from "~/components/Entity/Entity";
import { MenuButton } from "~/components/MenuButton";

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

              <Entity
                key={variant.uuid}
                title={variant.value}
                description={
                  variant.isControl ? `This is the control variant` : undefined
                }
                avatar={<VariantDot size="L" variant={variant.value} />}
                actions={
                  <>
                    <FormSliderInput
                      id={`rolloutPercentage-${index}`}
                      name={`rolloutPercentage`}
                      label={`Variant ${index + 1} rollout percentage`}
                      initialPercentage={variant.rolloutPercentage}
                      bgColor={background}
                      fgColor={color}
                    />
                    <MenuButton
                      variant="action"
                      items={[
                        {
                          label: "Attach metric",
                          href: `./metrics/create?variant=${variant.uuid}`,
                          noInitial: true,
                        },
                        {
                          label: "Delete",
                          href: `./variants/${variant.uuid}/delete`,
                          noInitial: true,
                        },
                      ]}
                      label={"Action on the variant"}
                    />
                  </>
                }
              />
            </div>
          );
        })}
      </Form>
    </div>
  );
};

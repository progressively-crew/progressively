import { Form } from "@remix-run/react";
import { useState } from "react";
import { SliderInput } from "~/components/Fields/SliderInput";
import { TextInput } from "~/components/Fields/TextInput";
import { Variant } from "../types";
import { stringToColor } from "~/modules/misc/utils/stringToColor";
import { MenuButton } from "~/components/MenuButton";
import { Radio } from "~/components/Fields/Radio";
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

export interface VariantListProps {
  variants: Array<Variant>;
  errors?: Record<string, string>;
}
export const VariantList = ({ variants, errors }: VariantListProps) => {
  return (
    <div>
      {variants.map((variant) => (
        <Form
          key={`delete-form-variant-${variant.uuid}`}
          method="post"
          id={`delete-form-${variant.uuid}`}
        >
          <input type="hidden" name="uuid" value={variant.uuid} />
          <input type="hidden" name="_type" value="delete-variant" />
        </Form>
      ))}
      <Form method="post" id="edit-variant">
        <input type="hidden" name="_type" value="edit-variant" />

        {variants.map((variant, index: number) => {
          const background = stringToColor(variant.value, 90);
          const color = stringToColor(variant.value, 25);

          return (
            <div key={variant.uuid}>
              <input type="hidden" name="uuid" value={variant.uuid} />
              <div
                className={`px-6 py-4 flex flex-row last:border-b-0 border-b border-gray-200 dark:border-slate-700 gap-6 items-center ${
                  variant.isControl ? "bg-gray-50 dark:bg-slate-800" : ""
                }`}
              >
                <Radio
                  type={"radio"}
                  name={"isControl"}
                  value={variant.uuid}
                  defaultChecked={variant.isControl}
                  aria-label={`Is variant at position ${
                    index + 1
                  } the control variant?`}
                  readOnly
                  checkedColor={background}
                />

                <TextInput
                  hiddenLabel
                  id={`name-${index}`}
                  name="name"
                  defaultValue={variant.value}
                  label={`Variant ${index + 1} value`}
                  isInvalid={Boolean(errors?.[`name-${index}`])}
                />

                <FormSliderInput
                  id={`rolloutPercentage-${index}`}
                  name={`rolloutPercentage`}
                  label={`Variant ${index + 1} rollout percentage`}
                  initialPercentage={variant.rolloutPercentage}
                  bgColor={background}
                  fgColor={color}
                />

                <MenuButton
                  items={[
                    {
                      label: "Attach metric",
                      href: `../metrics/create?variant=${variant.uuid}`,
                    },
                    {
                      label: "Remove",
                      onClick: () => {
                        const formEl = document.querySelector(
                          `#delete-form-${variant.uuid}`
                        ) as HTMLFormElement | undefined;
                        formEl?.submit();
                      },
                    },
                  ]}
                  label={"Actions on variant"}
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

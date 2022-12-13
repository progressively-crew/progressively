import { Form } from "@remix-run/react";
import React, { useState } from "react";
import { DeleteButton } from "~/components/Buttons/DeleteButton";
import { CardContent } from "~/components/Card";
import { Label } from "~/components/Fields/Label";
import { Radio } from "~/components/Fields/Radio";
import { SliderInput } from "~/components/Fields/SliderInput";
import { TextInput } from "~/components/Fields/TextInput";
import { HideDesktop } from "~/components/HideMobile";
import { HStack } from "~/components/HStack";
import { Variant } from "../types";
import { RawTable, Td, Th, Tr } from "~/components/RawTable";
import { stringToColor } from "~/modules/misc/utils/stringToColor";

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
  action?: React.ReactNode;
}
export const VariantList = ({
  variants,
  errors,

  action,
}: VariantListProps) => {
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

        <RawTable>
          <thead>
            <Tr>
              <Th>Variant</Th>
              <Th>Rollout percentage</Th>
              <Th className="text-center">Is control</Th>
              <Th>Actions</Th>
            </Tr>
          </thead>

          <tbody>
            {variants.map((variant, index) => {
              const background = stringToColor(variant.value, 90);
              const color = stringToColor(variant.value, 25);

              return (
                <Tr
                  key={`variant-${variant.uuid}`}
                  className={
                    variant.isControl
                      ? "bg-gray-50 dark:bg-slate-700"
                      : undefined
                  }
                >
                  <Td>
                    <TextInput
                      hiddenLabel
                      id={`name-${index}`}
                      name="name"
                      defaultValue={variant.value}
                      label={`Variant ${index + 1} value`}
                      isInvalid={Boolean(errors?.[`name-${index}`])}
                    />
                  </Td>

                  <Td>
                    <FormSliderInput
                      id={`rolloutPercentage-${index}`}
                      name={`rolloutPercentage`}
                      label={`Variant ${index + 1} rollout percentage`}
                      initialPercentage={variant.rolloutPercentage}
                      bgColor={background}
                      fgColor={color}
                    />
                  </Td>

                  <Td className="text-center py-4 px-8 flex justify-center">
                    <input type="hidden" name="uuid" value={variant.uuid} />
                    <Radio
                      type={"radio"}
                      name={"isControl"}
                      value={variant.uuid}
                      defaultChecked={variant.isControl}
                      aria-label={`Is variant at position ${
                        index + 1
                      } the control variant?`}
                      readOnly
                    />
                  </Td>

                  <Td>
                    <DeleteButton
                      variant="secondary"
                      type="submit"
                      form={`delete-form-${variant.uuid}`}
                    >
                      Remove
                    </DeleteButton>
                  </Td>
                </Tr>
              );
            })}
          </tbody>
        </RawTable>
      </Form>

      <CardContent>
        <HStack>{action}</HStack>
      </CardContent>
    </div>
  );
};

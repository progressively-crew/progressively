import { Form } from "@remix-run/react";
import { useState } from "react";
import { DeleteButton } from "~/components/Buttons/DeleteButton";
import { SubmitButton } from "~/components/Buttons/SubmitButton";
import { SliderInput } from "~/components/Fields/SliderInput";
import { TextInput } from "~/components/Fields/TextInput";
import { HStack } from "~/components/HStack";
import { Spacer } from "~/components/Spacer";
import { styled } from "~/stitches.config";
import { Variant } from "../types";

const FieldSets = styled("fieldset", {
  "& fieldset": {
    borderTop: "1px solid $heracles",
    padding: "$spacing$4 0",
  },
});

export interface FormSliderInputProps {
  name: string;
  label: string;
  id: string;
  initialPercentage: number;
}

const FormSliderInput = ({
  name,
  label,
  id,
  initialPercentage,
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

      <Spacer size={6} />

      <Form method="post" id="edit-variant">
        <input type="hidden" name="_type" value="edit-variant" />

        <FieldSets>
          {variants.map((variant, index) => (
            <fieldset
              key={`variant-${variant.uuid}`}
              aria-label={`Variant at position ${index + 1}`}
            >
              <input type="hidden" name="uuid" value={variant.uuid} />

              <HStack spacing={10}>
                <HStack spacing={4}>
                  <TextInput
                    hiddenLabel
                    id={`name-${index}`}
                    name="name"
                    defaultValue={variant.value}
                    label={`Variant ${index + 1} value`}
                    isInvalid={Boolean(errors?.[`name-${index}`])}
                  />
                </HStack>

                <FormSliderInput
                  id={`rolloutPercentage-${index}`}
                  name={`rolloutPercentage`}
                  label={`Variant ${index + 1} rollout percentage`}
                  initialPercentage={variant.rolloutPercentage}
                />

                <DeleteButton
                  small
                  type="submit"
                  form={`delete-form-${variant.uuid}`}
                >
                  Remove
                </DeleteButton>
              </HStack>
            </fieldset>
          ))}
        </FieldSets>

        <Spacer size={6} />

        <div>
          <SubmitButton form="edit-variant">Edit variants</SubmitButton>
        </div>
      </Form>

      <Spacer size={6} />
    </div>
  );
};

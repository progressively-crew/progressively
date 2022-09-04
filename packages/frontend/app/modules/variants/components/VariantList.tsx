import { Form } from "@remix-run/react";
import { useState } from "react";
import { DeleteButton } from "~/components/Buttons/DeleteButton";
import { SubmitButton } from "~/components/Buttons/SubmitButton";
import { Checkbox } from "~/components/Checkbox";
import { SliderInput } from "~/components/Fields/SliderInput";
import { TextInput } from "~/components/Fields/TextInput";
import { HStack } from "~/components/HStack";
import { Spacer } from "~/components/Spacer";
import { Stack } from "~/components/Stack";

import { Variant } from "../types";

export interface FormSliderInputProps {
  name: string;
  label: string;
  id: string;
}

const FormSliderInput = ({ name, label, id }: FormSliderInputProps) => {
  const [percentage, setPercentage] = useState(0);

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
      <Form method="post" id="delete-form">
        <input type="hidden" name="_type" value="delete-variant" />

        <DeleteButton small type="submit">
          Remove selected
        </DeleteButton>
      </Form>

      <Spacer size={6} />

      <Form method="post" id="edit-variant">
        <input type="hidden" name="_type" value="edit-variant" />

        <Stack spacing={6}>
          {variants.map((variant, index) => (
            <fieldset
              key={`variant-at-${index}`}
              aria-label={`Variant at position ${index + 1}`}
            >
              <input type="hidden" name="uuid" value={variant.uuid} />

              <HStack spacing={10}>
                <HStack spacing={4}>
                  <Checkbox
                    form={"delete-form"}
                    value={variant.uuid}
                    name={"selected"}
                    aria-label="Select the variant"
                  />

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
                />
              </HStack>
            </fieldset>
          ))}

          <div>
            <SubmitButton form="edit-variant">Edit variants</SubmitButton>
          </div>
        </Stack>
      </Form>

      <Spacer size={6} />
    </div>
  );
};

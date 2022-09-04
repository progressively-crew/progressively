import { Form } from "@remix-run/react";
import { useState } from "react";
import { DeleteButton } from "~/components/Buttons/DeleteButton";
import { SubmitButton } from "~/components/Buttons/SubmitButton";
import { Checkbox } from "~/components/Checkbox";
import { SliderInput } from "~/components/Fields/SliderInput";
import { TextInput } from "~/components/Fields/TextInput";
import { HStack } from "~/components/HStack";
import { RawTable } from "~/components/RawTable";
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
  console.log("xxx", errors);

  return (
    <Form method="post">
      <input type="hidden" name="_type" value="edit-variant" />

      <Stack spacing={6}>
        {variants.map((variant, index) => (
          <fieldset
            key={`variant-at-${index}`}
            aria-label={`Variant at position ${index + 1}`}
          >
            <input type="hidden" name="uuid" value={variant.uuid} />

            <HStack spacing={10}>
              <Checkbox
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

              <FormSliderInput
                id={`rolloutPercentage-${index}`}
                name={`rolloutPercentage`}
                label={`Variant ${index + 1} rollout percentage`}
              />
            </HStack>
          </fieldset>
        ))}

        <div>
          <SubmitButton>Edit variants</SubmitButton>
        </div>
      </Stack>
    </Form>
  );
};

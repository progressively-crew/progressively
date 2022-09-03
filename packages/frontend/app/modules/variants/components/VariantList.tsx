import { Form } from "@remix-run/react";
import { useState } from "react";
import { DeleteButton } from "~/components/Buttons/DeleteButton";
import { SubmitButton } from "~/components/Buttons/SubmitButton";
import { SliderInput } from "~/components/Fields/SliderInput";
import { TextInput } from "~/components/Fields/TextInput";
import { HStack } from "~/components/HStack";
import { RawTable } from "~/components/RawTable";
import { Stack } from "~/components/Stack";

import { Variant } from "../types";

export interface FormSliderInputProps {
  name: string;
  label: string;
}

const FormSliderInput = ({ name, label }: FormSliderInputProps) => {
  const [percentage, setPercentage] = useState(0);

  return (
    <SliderInput
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
}
export const VariantList = ({ variants }: VariantListProps) => {
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
              <TextInput
                hiddenLabel
                name="name"
                defaultValue={variant.value}
                label={`Variant ${index + 1} value`}
              />

              <FormSliderInput
                name={`rolloutPercentage`}
                label={`Variant ${index + 1} rollout percentage`}
              />

              <Form method="post">
                <input type="hidden" name="_type" value="delete-variant" />
                <input type="hidden" name="variantId" value={variant.uuid} />

                <DeleteButton small type="submit">
                  Remove
                </DeleteButton>
              </Form>
            </HStack>
          </fieldset>
        ))}

        <div>
          <SubmitButton>Edit variants</SubmitButton>
        </div>
      </Stack>
    </Form>
  );
  return (
    <RawTable>
      <thead>
        <tr>
          <th>Value</th>
          <th>Rollout percentage</th>
          <th>Is this the control</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {variants.map((variant) => (
          <tr key={`${variant.uuid}`}>
            <td>
              <div>{variant.value}</div>
            </td>

            <td>
              <div>{variant.rolloutPercentage}%</div>
            </td>
            <td>
              <div>{variant.isControl}</div>
            </td>
            <td>
              <Form method="post">
                <input type="hidden" name="_type" value="delete-variant" />
                <input type="hidden" name="variantId" value={variant.uuid} />

                <DeleteButton small type="submit">
                  Remove
                </DeleteButton>
              </Form>
            </td>
          </tr>
        ))}
      </tbody>
    </RawTable>
  );
};

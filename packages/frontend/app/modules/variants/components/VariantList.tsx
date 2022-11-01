import { Form } from "@remix-run/react";
import { useState } from "react";
import { DeleteButton } from "~/components/Buttons/DeleteButton";
import { SubmitButton } from "~/components/Buttons/SubmitButton";
import { CardContent } from "~/components/Card";
import { Label } from "~/components/Fields/Label";
import { Radio } from "~/components/Fields/Radio";
import { SliderInput } from "~/components/Fields/SliderInput";
import { TextInput } from "~/components/Fields/TextInput";
import { HideDesktop } from "~/components/HideMobile";
import { HStack } from "~/components/HStack";
import { Spacer } from "~/components/Spacer";
import { Variant } from "../types";
import { RawTable, Td, Th, Tr } from "~/components/RawTable";

export enum VariantListModes {
  Editing = "Editing",
  Operational = "Operational",
}

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
  mode?: VariantListModes;
}
export const VariantList = ({ variants, errors, mode }: VariantListProps) => {
  const currentMode = mode || VariantListModes.Editing;

  const isValueInputDisabled = currentMode === VariantListModes.Operational;
  const showRemoveButton = currentMode === VariantListModes.Editing;

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

        <RawTable>
          <thead>
            <Tr>
              <Th>Is control</Th>
              <Th>Variant value</Th>
              <Th>Rollout percentage</Th>
              {showRemoveButton && <Th>Actions</Th>}
            </Tr>
          </thead>

          <tbody>
            {variants.map((variant, index) => (
              <Tr key={`variant-${variant.uuid}`}>
                <Td>
                  <HStack spacing={2}>
                    <div>
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
                    </div>
                    <HideDesktop>
                      <Label>Is control variant</Label>
                    </HideDesktop>
                  </HStack>
                </Td>
                <Td>
                  <TextInput
                    hiddenLabel
                    id={`name-${index}`}
                    name="name"
                    defaultValue={variant.value}
                    label={`Variant ${index + 1} value`}
                    isInvalid={Boolean(errors?.[`name-${index}`])}
                    isDisabled={isValueInputDisabled}
                    small
                  />
                </Td>

                <Td>
                  <FormSliderInput
                    id={`rolloutPercentage-${index}`}
                    name={`rolloutPercentage`}
                    label={`Variant ${index + 1} rollout percentage`}
                    initialPercentage={variant.rolloutPercentage}
                  />
                </Td>

                {showRemoveButton && (
                  <Td>
                    <DeleteButton
                      variant="tertiary"
                      small
                      type="submit"
                      form={`delete-form-${variant.uuid}`}
                    >
                      Remove
                    </DeleteButton>
                  </Td>
                )}
              </Tr>
            ))}
          </tbody>
        </RawTable>

        <Spacer size={6} />

        <CardContent noTop noBottom>
          <SubmitButton form="edit-variant">Edit variants</SubmitButton>
        </CardContent>
      </Form>

      <Spacer size={6} />
    </div>
  );
};

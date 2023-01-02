import { Form } from "@remix-run/react";
import { useState } from "react";
import { DeleteButton } from "~/components/Buttons/DeleteButton";
import { Radio } from "~/components/Fields/Radio";
import { SliderInput } from "~/components/Fields/SliderInput";
import { TextInput } from "~/components/Fields/TextInput";
import { Variant } from "../types";
import { RawTable, Td, Th, Tr } from "~/components/RawTable";
import { stringToColor } from "~/modules/misc/utils/stringToColor";
import { Button } from "~/components/Buttons/Button";
import { MetricIcon } from "~/components/Icons/MetricIcon";

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

        <RawTable caption="Variant list">
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
                <Tr key={`variant-${variant.uuid}`}>
                  <Td
                    className={`border-l-8 pl-6 ${
                      variant.isControl ? "" : "border-l-transparent"
                    }`}
                    style={
                      variant.isControl
                        ? { borderColor: background }
                        : undefined
                    }
                  >
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

                  <Td>
                    <input type="hidden" name="uuid" value={variant.uuid} />
                    <div className="flex justify-center">
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
                  </Td>

                  <Td>
                    <div className="flex flex-row gap-4">
                      <Button
                        variant="secondary"
                        size="S"
                        icon={<MetricIcon />}
                        to={`../metrics/create?variant=${variant.uuid}`}
                      >
                        Attach metric
                      </Button>

                      <DeleteButton
                        size="S"
                        variant="secondary"
                        type="submit"
                        form={`delete-form-${variant.uuid}`}
                      >
                        Remove
                      </DeleteButton>
                    </div>
                  </Td>
                </Tr>
              );
            })}
          </tbody>
        </RawTable>
      </Form>
    </div>
  );
};

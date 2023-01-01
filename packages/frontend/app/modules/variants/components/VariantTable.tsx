import { Form } from "@remix-run/react";
import { useState } from "react";
import { SliderInput } from "~/components/Fields/SliderInput";
import { Variant } from "../types";
import { RawTable, Td, Th, Tr } from "~/components/RawTable";
import { Tag } from "~/components/Tag";
import { stringToColor } from "~/modules/misc/utils/stringToColor";
import { AiFillCheckCircle } from "react-icons/ai";

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

        <RawTable caption="Variant list">
          <thead>
            <Tr>
              <Th>Variant</Th>
              <Th>Rollout percentage</Th>
              <Th className="text-center">Is control</Th>
            </Tr>
          </thead>

          <tbody>
            {variants.map((variant, index) => {
              const background = stringToColor(variant.value, 75);
              const color = stringToColor(variant.value, 25);

              return (
                <Tr key={`variant-${variant.uuid}`}>
                  <Td
                    className={`border-l-8 ${
                      variant.isControl ? "" : "border-l-transparent"
                    }`}
                    style={
                      variant.isControl
                        ? { borderColor: background }
                        : undefined
                    }
                  >
                    <input type="hidden" value={variant.value} name={"name"} />

                    <span className="flex flex-row gap-3 items-center">
                      <span
                        aria-hidden
                        style={{ background }}
                        className="h-4 w-4 block rounded"
                      />
                      {variant.value}
                    </span>
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
                    {variant.isControl && (
                      <input
                        type="hidden"
                        name="isControl"
                        value={variant.uuid}
                      />
                    )}

                    {variant.isControl && (
                      <div className="flex justify-center">
                        <AiFillCheckCircle
                          aria-label="This is the control version"
                          className="text-2xl"
                          style={{ color: background }}
                        />
                      </div>
                    )}
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

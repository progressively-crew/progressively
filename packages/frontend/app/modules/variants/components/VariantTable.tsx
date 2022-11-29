import { Form } from "@remix-run/react";
import React, { useState } from "react";
import { CardContent } from "~/components/Card";
import { SliderInput } from "~/components/Fields/SliderInput";
import { HStack } from "~/components/HStack";
import { Variant } from "../types";
import { RawTable, Td, Th, Tr } from "~/components/RawTable";
import { Tag } from "~/components/Tag";
import { stringToColor } from "~/modules/misc/utils/stringToColor";
import { Checkbox } from "~/components/Checkbox";

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

export interface VariantTableProps {
  variants: Array<Variant>;
  errors?: Record<string, string>;
  action?: React.ReactNode;
}
export const VariantTable = ({ variants, action }: VariantTableProps) => {
  return (
    <div>
      <Form method="post" id="edit-variant">
        <input type="hidden" name="_type" value="edit-variant" />

        <RawTable>
          <thead>
            <Tr>
              <Th>Variant</Th>
              <Th>Rollout percentage</Th>
              <Th className="py-3 px-8 bg-gray-100 text-center uppercase text-sm text-gray-600 tracking-wide">
                Is control
              </Th>
            </Tr>
          </thead>

          <tbody>
            {variants.map((variant, index) => (
              <Tr key={`variant-${variant.uuid}`}>
                <Td>
                  <input type="hidden" value={variant.value} name={"name"} />

                  <Tag
                    style={{
                      background: stringToColor(variant.value, 90),
                      color: stringToColor(variant.value, 25),
                    }}
                  >
                    {variant.value}
                  </Tag>
                </Td>

                <Td>
                  <FormSliderInput
                    id={`rolloutPercentage-${index}`}
                    name={`rolloutPercentage`}
                    label={`Variant ${index + 1} rollout percentage`}
                    initialPercentage={variant.rolloutPercentage}
                  />
                </Td>
                <Td className="text-center py-4 px-8">
                  <input type="hidden" name="uuid" value={variant.uuid} />

                  {variant.isControl && (
                    <Checkbox
                      disabled
                      checked={Boolean(variant.uuid)}
                      value={variant.uuid}
                      name={"isControl"}
                      onChange={() => {}}
                      readOnly
                    />
                  )}
                </Td>
              </Tr>
            ))}
          </tbody>
        </RawTable>

        <CardContent>
          <HStack>{action}</HStack>
        </CardContent>
      </Form>
    </div>
  );
};

import { Form } from "@remix-run/react";
import { useState } from "react";
import { DeleteButton } from "~/components/Buttons/DeleteButton";
import { SubmitButton } from "~/components/Buttons/SubmitButton";
import { CardContent } from "~/components/Card";
import { SliderInput } from "~/components/Fields/SliderInput";
import { TextInput } from "~/components/Fields/TextInput";
import { Spacer } from "~/components/Spacer";
import { Typography } from "~/components/Typography";
import { styled } from "~/stitches.config";
import { Variant } from "../types";

const Grid = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  gap: "$spacing$10",
  alignItems: "center",
  padding: "0 $spacing$12",
});

const FieldSets = styled("div", {
  "& fieldset": {
    borderTop: "1px solid $heracles",
    padding: "$spacing$4 0",
  },

  "& fieldset:last-of-type": {
    borderBottom: "1px solid $heracles",
  },
});

export interface FormSliderInputProps {
  name: string;
  label: string;
  id: string;
  initialPercentage: number;
}

const FormSliderInput = ({ name, label, id, initialPercentage }: FormSliderInputProps) => {
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

        <Grid aria-hidden>
          <Typography textTransform="uppercase" size="neptune" font="title">
            Variant value
          </Typography>

          <Typography fontWeight="bold" textTransform="uppercase" size="neptune" font="title">
            Rollout percentage
          </Typography>

          <Typography fontWeight="bold" textTransform="uppercase" size="neptune" font="title">
            Actions
          </Typography>
        </Grid>

        <Spacer size={3} />

        <FieldSets>
          {variants.map((variant, index) => (
            <fieldset
              key={`variant-${variant.uuid}`}
              aria-label={`Variant at position ${index + 1}`}
            >
              <input type="hidden" name="uuid" value={variant.uuid} />

              <Grid>
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
                />

                <div>
                  <DeleteButton small type="submit" form={`delete-form-${variant.uuid}`}>
                    Remove
                  </DeleteButton>
                </div>
              </Grid>
            </fieldset>
          ))}
        </FieldSets>

        <Spacer size={6} />

        <CardContent noTop noBottom>
          <SubmitButton form="edit-variant">Edit variants</SubmitButton>
        </CardContent>
      </Form>

      <Spacer size={6} />
    </div>
  );
};

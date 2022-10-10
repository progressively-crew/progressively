import { Form } from "@remix-run/react";
import { useState } from "react";
import { DeleteButton } from "~/components/Buttons/DeleteButton";
import { SubmitButton } from "~/components/Buttons/SubmitButton";
import { CardContent } from "~/components/Card";
import { Radio } from "~/components/Fields/Radio";
import { SliderInput } from "~/components/Fields/SliderInput";
import { TextInput } from "~/components/Fields/TextInput";
import { Spacer } from "~/components/Spacer";
import { Typography } from "~/components/Typography";
import { styled } from "~/stitches.config";
import { Variant } from "../types";

export enum VariantListModes {
  Editing = "Editing",
  Operational = "Operational",
}

const Wrapper = styled("div", {
  display: "table",
  width: "100%",

  "& .row": {
    display: "table-row",
    borderLeft: "4px solid transparent",
  },

  "& .row:hover": {
    background: "$heracles",

    "& .col:first-of-type": {
      borderLeft: "4px solid $nemesis",
    },
  },

  "& .row:first-of-type:hover": {
    background: "transparent",

    "& .col:first-of-type": {
      borderLeft: "4px solid transparent",
    },
  },

  "& .col": {
    borderBottom: "1px solid $heracles",
    display: "table-cell",
    verticalAlign: "middle",
    padding: "0 $spacing$4",
    height: "$cta",
  },

  "& .col:first-of-type": {
    borderLeft: "4px solid transparent",
    paddingLeft: "$spacing$12",
  },

  "& .col:last-of-type": {
    paddingRight: "$spacing$12",
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

        <Wrapper>
          <div className="row">
            <div className="col">
              <Typography
                textTransform="uppercase"
                size="neptune"
                font="title"
                as="span"
              >
                Is control
              </Typography>
            </div>

            <div className="col">
              <Typography
                textTransform="uppercase"
                size="neptune"
                font="title"
                as="span"
              >
                Variant value
              </Typography>
            </div>

            <div className="col">
              <Typography
                fontWeight="bold"
                textTransform="uppercase"
                size="neptune"
                font="title"
                as="span"
              >
                Rollout percentage
              </Typography>
            </div>

            {showRemoveButton && (
              <div className="col">
                <Typography
                  fontWeight="bold"
                  textTransform="uppercase"
                  size="neptune"
                  font="title"
                  as="span"
                >
                  Actions
                </Typography>
              </div>
            )}
          </div>

          <div>
            {variants.map((variant, index) => (
              <div
                role="group"
                className="row"
                key={`variant-${variant.uuid}`}
                aria-label={`Variant at position ${index + 1}`}
              >
                <div className="col">
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

                <div className="col">
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
                </div>

                <div className="col">
                  <FormSliderInput
                    id={`rolloutPercentage-${index}`}
                    name={`rolloutPercentage`}
                    label={`Variant ${index + 1} rollout percentage`}
                    initialPercentage={variant.rolloutPercentage}
                  />
                </div>

                {showRemoveButton && (
                  <div className="col">
                    <DeleteButton
                      variant="tertiary"
                      small
                      type="submit"
                      form={`delete-form-${variant.uuid}`}
                    >
                      Remove
                    </DeleteButton>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Wrapper>

        <Spacer size={6} />

        <CardContent noTop noBottom>
          <SubmitButton form="edit-variant">Edit variants</SubmitButton>
        </CardContent>
      </Form>

      <Spacer size={6} />
    </div>
  );
};

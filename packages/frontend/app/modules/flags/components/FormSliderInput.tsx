import { useState } from "react";
import { SliderInput } from "~/components/Fields/SliderInput";

export interface FormSliderInputProps {
  name: string;
  label: string;
  id?: string;
  initialPercentage: number;
  bgColor?: string;
  fgColor?: string;
}

export const FormSliderInput = ({
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

import {
  FormControl,
  FormLabel,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";

export interface SliderInputProps {
  percentageValue: number;
  name: string;
  label: string;
  onChange: (nextValue: number) => void;
}

export const SliderInput = ({
  percentageValue,
  name,
  label,
  onChange,
}: SliderInputProps) => {
  return (
    <FormControl>
      <FormLabel htmlFor={`field-${name}`}>{label}</FormLabel>

      <Slider
        name={`field-${name}`}
        id={`field-${name}`}
        aria-labelledby="percentage-value"
        min={0}
        max={100}
        step={1}
        value={percentageValue}
        onChange={onChange}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </FormControl>
  );
};

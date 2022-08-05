import { styled } from "~/stitches.config";
import { HStack } from "../HStack";
import { Stack } from "../Stack";
import { Label } from "./Label";

export interface RadioFieldOption<T> {
  label: string;
  value: T;
}

export interface RadioFieldProps<T> {
  name: string;
  value: string | number;
  onChange: (nextValue: T) => void;
  options: Array<RadioFieldOption<T>>;
  title: string;
}

const Input = styled("input", {
  margin: 0,
  padding: 0,
  backgroundColor: "transparent",
  border: "1px solid $secondary",
  borderRadius: "50%",
  height: 24,
  width: 24,
  "-webkit-appearance": "none",
  "&:after": {
    borderRadius: " 50%",
    content: "",
    position: "relative",
    zIndex: 1,
    display: "block",
    height: 18,
    width: 18,
    left: 2,
    top: 2,
  },
  "&:checked:after": {
    background: "$secondary",
  },
});

const SmallLabel = styled(Label, {
  fontSize: "$uranus",
});

export const RadioField = <T extends string>({
  name,
  value,
  onChange,
  options,
  title,
}: RadioFieldProps<T>) => {
  return (
    <Stack as="fieldset" spacing={4}>
      <Label as="legend">{title}</Label>
      <Stack spacing={2}>
        {options.map((opt) => (
          <HStack key={opt.value} spacing={2}>
            <Input
              type="radio"
              id={opt.value}
              name={name}
              value={opt.value}
              checked={opt.value === value}
              onChange={(e) => onChange(e.target.value as T)}
            />
            <SmallLabel htmlFor={opt.value}>{opt.label}</SmallLabel>
          </HStack>
        ))}
      </Stack>
    </Stack>
  );
};

import { styled } from "~/stitches.config";
import { HStack } from "../HStack";
import { Spacer } from "../Spacer";
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
  border: "1px solid $hermes",
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
    background: "$hermes",
  },
});

export const RadioField = <T extends string>({
  name,
  value,
  onChange,
  options,
  title,
}: RadioFieldProps<T>) => {
  return (
    <fieldset>
      <Label as="legend">{title}</Label>
      <Spacer size={2} />
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
            <Label size="uranus" htmlFor={opt.value}>
              {opt.label}
            </Label>
          </HStack>
        ))}
      </Stack>
    </fieldset>
  );
};

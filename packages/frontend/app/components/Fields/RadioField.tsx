import { styled } from "~/stitches.config";
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

const RadioItem = styled("div", {
  display: "flex",
  gap: "$spacing$2",
  alignItems: "center",
});

const Input = styled("input", {
  margin: 0,
  padding: 0,
  backgroundColor: "transparent",
  border: "1px solid $hover",
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
    background: "$hover",
  },
});

const SmallLabel = styled(Label, {
  fontSize: "$btn",
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
          <RadioItem key={opt.value}>
            <Input
              type="radio"
              id={opt.value}
              name={name}
              value={opt.value}
              checked={opt.value === value}
              onChange={(e) => onChange(e.target.value as T)}
            />
            <SmallLabel htmlFor={opt.value}>{opt.label}</SmallLabel>
          </RadioItem>
        ))}
      </Stack>
    </Stack>
  );
};

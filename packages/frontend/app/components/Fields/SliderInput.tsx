import { styled } from "~/stitches.config";
import { HStack } from "../HStack";
import { Stack } from "../Stack";
import { Label } from "./Label";

export interface SliderInputProps {
  percentageValue: number;
  name: string;
  label: string;
  onChange: (nextValue: number) => void;
}

const ThumbSize = 1.6;
const TrackSize = 0.5;
const InputWidth = 15;

const RangeInput = styled("input", {
  "-webkit-appearance": "none",
  appearance: "none",
  background: "transparent",
  cursor: "pointer",
  height: `${TrackSize}rem`,
  width: `${InputWidth}rem`,

  // chrome edge safari
  "&::-webkit-slider-runnable-track": {
    background: "$heracles",
    height: `${TrackSize}rem`,
    borderRadius: "$borderRadius$regular",
  },

  "&::-webkit-slider-thumb": {
    "-webkit-appearance": "none",
    appearance: "none",
    marginTop: `-${(ThumbSize - TrackSize) / 2}rem`,
    borderRadius: "50%",
    backgroundColor: "$hermes",
    height: `${ThumbSize}rem`,
    width: `${ThumbSize}rem`,
  },

  // firefox
  "&::-moz-range-track": {
    marginTop: `-${(ThumbSize - TrackSize) / 2}rem`,
    background: "$heracles",
    height: `${TrackSize}rem`,
    borderRadius: "$borderRadius$regular",
  },

  "&::-moz-range-thumb": {
    borderRadius: "50%",
    padding: "2px",
    border: "2px solid $hermes",
    backgroundColor: "$apollo",
    height: `${ThumbSize}rem`,
    width: `${ThumbSize}rem`,
  },
});

const ThumbnailValue = styled("div", {
  fontFamily: "$default",
  background: "$nemesis",
  color: "$apollo",
  padding: "$spacing$2",
  borderRadius: "$borderRadius$regular",
  width: "$spacing$12",
  textAlign: "center",
});

const Triangle = styled("div", {
  width: 0,
  height: 0,
  borderTop: "6px solid transparent",
  borderBottom: "6px solid transparent",
  borderRight: "6px solid $nemesis",
});

export const SliderInput = ({
  percentageValue,
  name,
  label,
  onChange,
}: SliderInputProps) => {
  return (
    <Stack spacing={2}>
      <Label htmlFor={`field-${name}`}>{label}</Label>

      <HStack spacing={2}>
        <RangeInput
          type="range"
          min={0}
          max={100}
          step={1}
          value={percentageValue}
          id={`field-${name}`}
          name={name}
          onChange={(e) => onChange(Number(e.target.value))}
        />

        <HStack aria-hidden>
          <Triangle />
          <ThumbnailValue>{percentageValue}%</ThumbnailValue>
        </HStack>
      </HStack>
    </Stack>
  );
};
